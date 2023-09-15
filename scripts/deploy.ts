const hre = require("hardhat");

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  //deploy the contract using ethers.js
  //Add the value of the maximum number of addresses gfpr the whitelist
  const whitelistContract = await hre.ethers.deployContract("Whitelist",[5]);
  
  //wait for the contract to deploy
  await whitelistContract.waitForDeployment();

  //print out the deployed address
  console.log("Whitelist Contract Address:", whitelistContract.target);

  // Sleep for 30 seconds while Etherscan indexes the new contract deployment
  await sleep(30 * 1000); // 30s = 30 * 1000 milliseconds

  // Verify the contract on etherscan
  await hre.run("verify:verify", {
    address: whitelistContract.target,
    constructorArguments: [5],
    });

  }
  
// Check and handle errors
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
