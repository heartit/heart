import { expect } from "chai"
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
      await expect(heart.addBeat(signers[1].address, "tree", 1000000)).to.emit(
        heart,
        "BeatAdded"
      )
    })
    it("reverts with error if rhythm is not in range (0000000,9999999)", async function () {
      await expect(
        heart.addBeat(signers[1].address, "tree", 10000001)
      ).to.be.revertedWith("[ERR]")
    })
  })

  describe("getBeats", function () {
    it("returns array of Beat[] with data as parameter", async function () {
      await heart.addBeat(signers[1].address, "tree", 1000000)
      await heart.addBeat(signers[2].address, "tree", 1025000)

      const beatsFromData = await heart.getBeats("tree")

      expect(beatsFromData[1]["rhythm"]).to.equal(1025000)
      expect(beatsFromData[1]["addr"]).to.equal(signers[2].address)
    })
  })

  describe("reward", function () {
    let rewardValue = ethers.utils.parseUnits("10.0", "ether")
    let rewardBeats = []
    beforeEach(async function () {
      for (let i = 0; i < 5; i++) {
        await heart.addBeat(signers[i + 1].address, "tree", 1000000)
        rewardBeats.push({
          data: "tree",
          addr: signers[i + 1].address,
          rhythm: 1000000,
          goalRhythm: 1000000,
        })
      }
    })
    it("reverts if no ETH is attached", async function () {
      await expect(
        heart.reward([
          {
            data: "tree",
            addr: signers[1].address,
            rhythm: 1000000,
            goalRhythm: 1000000,
          },
          {
            data: "tree",
            addr: signers[2].address,
            rhythm: 0,
            goalRhythm: 1000000,
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
        console.log(finalBals[i])
      }

      for (let i = 0; i < rewardBeats.length; i++) {
        expect(finalBals[i]).to.equal(initBals[i].add(2000000000000000000n))
      }
    })
  })
})
