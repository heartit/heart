import { ethers, network, run } from "hardhat"

async function main() {
  const Heart = await ethers.getContractFactory("Heart")
  console.log("[W8] Deploying contract...")
  const heart = await Heart.deploy()
  await heart.deployed()

  if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
    console.log("[W8] Looking for block confirmations...")
    await heart.deployTransaction.wait(6)
    await verify(heart.address, [])
  }

  console.log(`[OK] Deployed contract address: ${heart.address}`)
}

const verify = async (contractAddress: string, args: any[]) => {
  console.log("[W8] Verifying contract...")
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (e: any) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("[OK] Contract is already verified.")
    } else {
      console.log("[ERR]", e)
    }
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
