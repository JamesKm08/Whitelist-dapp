import hre from "hardhat";

//add the whitelist contract address
const contractAddress = "0x6a75F164eE844d6954b50B99a10EE905EBFC0775";

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {

  //deploy the contract using ethers.js
 const nftContract = await hre.ethers.deployContract("CryptoDevs", [contractAddress]);
  
  //wait for the contract to deploy
  await nftContract.waitForDeployment();

  //print out the deployed address
  console.log("Whitelist Contract Address:", nftContract.target);

  // Sleep for 30 seconds while Etherscan indexes the new contract deployment
  await sleep(30 * 1000); // 30s = 30 * 1000 milliseconds

  // Verify the contract on etherscan
  await hre.run("verify:verify", {
    address: nftContract.target,
    constructorArguments: [contractAddress],
    });

  }
  
// Check and handle errors
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
