import {
  frontEndContractsFile,
  frontEndAbiFile,
  earthContractsFile,
  earthAbiFile,
} from "../helper-hardhat-config"
import fs from "fs"
import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"

const updateUI: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { network, ethers } = hre
  const chainId = network.config.chainId
  //const chainId = "31337"
  console.log(process.env.UPDATE_FRONT_END)
  if (process.env.UPDATE_FRONT_END) {
    console.log("[W8] Writing to front end...")
    const heart = await ethers.getContract("Heart")
    const heartEarth = await ethers.getContract("HeartEarth")
    const contractAddresses = JSON.parse(
      fs.readFileSync(frontEndContractsFile, "utf8")
    )
    const earthContractAddresses = JSON.parse(
      fs.readFileSync(earthContractsFile, "utf8")
    )

    if (chainId in contractAddresses) {
      if (!contractAddresses[network.config.chainId!].includes(heart.address)) {
        contractAddresses[network.config.chainId!].push(heart.address)
      }
    } else {
      contractAddresses[network.config.chainId!] = [heart.address]
    }

    if (chainId in earthContractAddresses) {
      if (
        !earthContractAddresses[network.config.chainId!].includes(
          heartEarth.address
        )
      ) {
        earthContractAddresses[network.config.chainId!].push(heartEarth.address)
      }
    } else {
      earthContractAddresses[network.config.chainId!] = [heartEarth.address]
    }

    fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddresses))
    fs.writeFileSync(earthContractsFile, JSON.stringify(earthContractAddresses))

    fs.writeFileSync(
      frontEndAbiFile,
      heart.interface.format(ethers.utils.FormatTypes.json)
    )

    fs.writeFileSync(
      earthAbiFile,
      heartEarth.interface.format(ethers.utils.FormatTypes.json)
    )

    console.log("[OK] Front end written!")
  }
}

export default updateUI
updateUI.tags = ["all", "frontend"]
