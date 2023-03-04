import {
  frontEndContractsFile,
  frontEndAbiFile,
} from "../helper-hardhat-config"
import fs from "fs"
import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"

const updateUI: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { network, ethers } = hre
  const chainId = "31337"
  console.log(process.env.UPDATE_FRONT_END)
  if (process.env.UPDATE_FRONT_END) {
    console.log("[W8] Writing to front end...")
    const heart = await ethers.getContract("Heart")
    const contractAddresses = JSON.parse(
      fs.readFileSync(frontEndContractsFile, "utf8")
    )
    if (chainId in contractAddresses) {
      if (!contractAddresses[network.config.chainId!].includes(heart.address)) {
        contractAddresses[network.config.chainId!].push(heart.address)
      }
    } else {
      contractAddresses[network.config.chainId!] = [heart.address]
    }
    fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddresses))
    fs.writeFileSync(
      frontEndAbiFile,
      heart.interface.format(ethers.utils.FormatTypes.json)
    )
    console.log("[OK] Front end written!")
  }
}

export default updateUI
updateUI.tags = ["all", "frontend"]
