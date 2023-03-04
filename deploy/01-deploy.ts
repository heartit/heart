import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import verify from "../utils/verify"
import {
  networkConfig,
  developmentChains,
  VERIFICATION_BLOCK_CONFIRMATIONS,
} from "../helper-hardhat-config"

const FUND_AMOUNT = "1000000000000000000000"

const deployHeart: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { deployments, getNamedAccounts, network, ethers } = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  // const chainId = network.config.chainId
  const chainId = 31337

  const waitBlockConfirmations = developmentChains.includes(network.name)
    ? 1
    : VERIFICATION_BLOCK_CONFIRMATIONS

  log("----------------------------------------------------")
  const args: any[] = [
    networkConfig[network.config.chainId!]["gasLane"],
    networkConfig[network.config.chainId!]["callbackGasLimit"],
  ]
  const heart = await deploy("Heart", {
    from: deployer,
    log: true,
    waitConfirmations: waitBlockConfirmations,
  })

  // Verify the deployment
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    log("[W8] Verifying...")
    await verify(heart.address, args)
  }

  //log("Run Price Feed contract with command:")
  const networkName = network.name == "hardhat" ? "localhost" : network.name
  //log(`yarn hardhat run scripts/enterRaffle.js --network ${networkName}`)
  log("----------------------------------------------------")
}

export default deployHeart
deployHeart.tags = ["all", "heart"]
