import { run } from "hardhat"

const verify = async (contractAddress: string, args: any[]) => {
  console.log("[W8] Verifying contract...")
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
    console.log("[OK] Verified.")
  } catch (e: any) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("[OK] Already verified!")
    } else {
      console.log(e)
    }
  }
}

export default verify
