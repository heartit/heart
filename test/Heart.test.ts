import { expect, assert } from "chai"
import { ethers } from "hardhat"
import { Heart, Heart__factory } from "../typechain-types"

describe("Heart", function () {
  let heart: Heart
  let heartFactory: Heart__factory
  let signers, deployer
  const provider = ethers.provider

  beforeEach(async function () {
    heartFactory = (await ethers.getContractFactory("Heart")) as Heart__factory
    heart = await heartFactory.deploy()
    signers = await ethers.getSigners()
    deployer = signers[0].address
  })

  describe("constructor", function () {
    it("sets the owner", async function () {
      const owner = await heart.owner()
      expect(deployer).to.equal(owner)
    })
  })

  describe("addBeat", function () {
    it("gets (address, data, rhythm) and emits BeatAdded event", async function () {
      await expect(heart.addBeat("tree", 1000000)).to.emit(heart, "BeatAdded")
    })
    it("reverts with error if rhythm is not in range (0,99999999)", async function () {
      await expect(heart.addBeat("tree", 100000001)).to.be.revertedWith("[ERR]")
    })
  })

  describe("getBeats", function () {
    it("returns array of Beat[] with data as parameter", async function () {
      await heart.addBeat("tree", 1000000)
      await heart.addBeat("tree", 1025000)

      const beatsFromData = await heart.getBeats("tree")

      expect(beatsFromData[1]["rhythm"]).to.equal(1025000)
      expect(beatsFromData[1]["addr"]).to.equal(deployer)
    })
  })

  describe("reward", function () {
    let rewardValue = ethers.utils.parseUnits("10.0", "ether")
    let rewardBeats = []
    beforeEach(async function () {
      for (let i = 0; i < 5; i++) {
        const connector = heart.connect(signers[i + 1])
        await connector.addBeat("tree", 10000000)
        rewardBeats.push({
          data: "tree",
          addr: signers[i + 1].address,
          rhythm: 10000000,
          goalRhythm: 10000000,
        })
      }
    })
    it("reverts if no ETH is attached", async function () {
      await expect(
        heart.reward([
          {
            data: "tree",
            addr: signers[1].address,
            rhythm: 10000000,
            goalRhythm: 10000000,
          },
          {
            data: "tree",
            addr: signers[2].address,
            rhythm: 0,
            goalRhythm: 10000000,
          },
        ])
      ).to.be.revertedWith("[ERR] Message value is not positive.")
    })
    it("reverts if beats parameter is empty", async function () {
      await expect(heart.reward([], { value: rewardValue })).to.be.revertedWith(
        "[ERR] Requires an array of Beats."
      )
    })
    it("rewards accurate rhythm creators with ETH", async function () {
      let initBals = []
      let finalBals = []

      for (let i = 0; i < 5; i++) {
        initBals.push(await provider.getBalance(signers[i + 1].address))
      }

      await heart.reward(rewardBeats, { value: rewardValue })

      for (let i = 0; i < 5; i++) {
        finalBals.push(await provider.getBalance(signers[i + 1].address))
      }

      for (let i = 0; i < 5; i++) {
        expect(finalBals[i].add(initBals[i].mul(-1))).to.be.at.least(
          1999999999999999998n
        )
        expect(finalBals[i].add(initBals[i].mul(-1))).to.be.at.most(
          20000000000000000000n
        )
      }
    })
  })
  describe("reward", function () {
    const rhythm = 10000000
    beforeEach(async function () {
      for (let i = 0; i < 5; i++) {
        const connector = heart.connect(signers[i + 1])
        await connector.addBeat("tree", rhythm)
      }
    })
    it("returns all the beats", async function () {
      const allBeats = await heart.getAllBeats()
      for (let i = 0; i < 5; i++) {
        expect(allBeats[i].data).to.equal("tree")
        expect(allBeats[i].addr).to.equal(signers[i + 1].address)
        expect(allBeats[i].rhythm.toString()).to.equal(rhythm.toString())
      }
    })
  })
})
