import { ethers } from "hardhat"

let heart, signers, accounts

async function main() {
  await initHeart("0x5FbDB2315678afecb367f032d93F642f64180aa3")
  //await addBeats(3, 1, "tree", 1000000)
  //await getBeats("tree")
  //await addBeats(8, 8, "fossil", 1000000)
  await getBeats("foobar")
}
main()

async function initHeart(_deployedAddr) {
  accounts = await ethers.provider.listAccounts()
  const Heart = await ethers.getContractFactory("Heart")
  heart = await Heart.attach(_deployedAddr)

  signers = await ethers.getSigners()
  console.log("[OK] Initialized Heart")
}

async function addBeats(_fromSigner, _toSigner, _data, _rhythm) {
  for (let i = _fromSigner; i <= _toSigner; i++) {
    const connectedSigner = heart.connect(signers[i])
    await connectedSigner.addBeat(_data, _rhythm)
  }

  console.log(`[OK] Beats with data ${_data} and rhythm ${_rhythm} added.`)
}

async function getBeats(_data) {
  const beats = await heart.getBeats(_data)
  console.log(beats)
}
