// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const { isConstructorDeclaration } = require("typescript");

async function main() {

  const Counter = await hre.ethers.getContractFactory("Counter");
  const counter1 = await Counter.deploy();

  await counter1.deployed();

  console.log(
    `deployed to ${counter1.address}`
  );

  const counter2 = await Counter.deploy();

  await counter2.deployed();

  console.log(
    `deployed to ${counter2.address}`
  );

  await counter2.countGas(1000, { "gasLimit": "200000"}).then((res) => {
    console.log(res[0].toString(), res[1].toString());
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
