import { ethers } from "hardhat"

export interface networkConfigItem {
  name?: string
  subscriptionId?: string
  gasLane?: string
  callbackGasLimit?: string
}

export interface networkConfigInfo {
  [key: number]: networkConfigItem
}

export const networkConfig: networkConfigInfo = {
  31337: {
    name: "localhost",
    subscriptionId: "588",
    gasLane:
      "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc", // 30 gwei
    callbackGasLimit: "500000", // 500,000 gas
  },
  5: {
    name: "goerli",
    subscriptionId: "588",
    gasLane:
      "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15", // 150 gwei
    callbackGasLimit: "500000", // 500,000 gas
  },
  1: {
    name: "mainnet",
  },
}

export const developmentChains = ["hardhat", "localhost"]
export const VERIFICATION_BLOCK_CONFIRMATIONS = 6
export const frontEndContractsFile =
  "../heart-ui/constants/contractAddresses.json"
export const frontEndAbiFile = "../heart-ui/constants/abi.json"
