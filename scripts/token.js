const { config } = require("chai");
const hre = require("hardhat");
const { isConstructorDeclaration } = require("typescript");
const env = require("./env.json") 
const valves = require("./valve.json") 
var fs = require('fs');



async function main(){
    const Token = await hre.ethers.getContractFactory("Token");
    const token = await Token.deploy("XT", String(10**18));
  
    await token.deployed();

    token.transfer(String(10**18), valves["nodes"][0])

    console.log("break point");

    const Valve = await hre.ethers.getContractFactory("Valve");

    const valve = await Valve.attach(valves["nodes"][0]);
    console.log("break point");
    console.log(valves["nodes"][0])

    
    await valve.Split(token.address, {gasLimit:200000000}).then(console.log);

    console.log("-------------break point------------");

    valves["nodes"].forEach(element => {
        console.log(`${element} -> `)
        token.balanceOf(element).then(console.log);
    });

     
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  