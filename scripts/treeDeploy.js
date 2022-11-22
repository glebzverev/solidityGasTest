const { config } = require("chai");
const hre = require("hardhat");
const { isConstructorDeclaration } = require("typescript");

async function main() {
  // const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  // const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  // const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  // const lockedAmount = hre.ethers.utils.parseEther("1");

  const Token = await hre.ethers.getContractFactory("Token");
  
  const token = await Token.deploy("heart", String(10**18));
  await token.deployed().then(() =>{
    console.log(
        `token  deployed to ${token.address}`
    );
  });

  let owner = await token.owner();

  await token.balanceOf(owner).then(console.log);


  const Valve = await hre.ethers.getContractFactory("Valve");
  
  const valve0 = await Valve.deploy();
  await valve0.deployed().then(() =>{
    console.log(
        `valve0  deployed to ${valve0.address}`
    );
  });

  const valve10 = await Valve.deploy();
  await valve10.deployed().then(() =>{
    console.log(
        `valve10 deployed to ${valve10.address}`
    );
  });

  const valve11 = await Valve.deploy();
  await valve11.deployed().then(() =>{
    console.log(
        `valve11 deployed to ${valve11.address}`
    );
  });

  const valve20 = await Valve.deploy();
  await valve20.deployed().then(() =>{
    console.log(
        `valve20 deployed to ${valve20.address}`
    );
  });
  const valve21 = await Valve.deploy();
  await valve21.deployed().then(() =>{
    console.log(
        `valve21 deployed to ${valve21.address}`
    );
  });

  await valve0.setPercents([["100", valve10.address], ["100", valve11.address]])
  await valve10.setPercents([["100", valve20.address], ["100", valve21.address]])


  const contracts = [valve0,valve10, valve11, valve20, valve21] 
  console.log("Before Split");
  for (var i in contracts){
    await token.balanceOf(contracts[i].address).then((res)=>{
        console.log(`balanceOf ${contracts[i].address} => ${res.toString()}`);
      })      
  }

  await token.transfer(valve0.address, String(10**18))
  await valve0.Split(token.address, {gasLimit: 2000000});
  
  console.log("After Split");
  for (var i in contracts){
    await token.balanceOf(contracts[i].address).then((res)=>{
        console.log(`balanceOf ${contracts[i].address} => ${res.toString()}`);
      })  
      await contracts[i].lastGasLeft().then((res)=>{
        console.log(`lastGasLeft ${contracts[i].address} => ${res.toString()}`);
      }) 
  }

  await valve0.width().then(console.log);
  await valve0.lastGasLeft().then((res)=>{
    console.log(res.toString());
  });
}

main().catch((error) => {
console.error(error);
process.exitCode = 1;
});
  