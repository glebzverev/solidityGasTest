const env = require("./env.json");
const { config } = require("chai");
const hre = require("hardhat");
const { isConstructorDeclaration } = require("typescript");
const addresses = require("./valve.json");



async function deploy_book(){
  const Book = await hre.ethers.getContractFactory("MyBook");
  
    const book = await Book.deploy();
    await book.deployed().then(() =>{
      console.log(
          `book deployed to ${book.address}`
      );
    });
    return book;
}

async function main(){
  const Book = await hre.ethers.getContractFactory("MyBook");
    const book = await Book.attach(
      addresses["book"] // The deployed contract address
    );

    await book.mint(addresses["nodes"][1], 0, 100, "0x");
    await book.mint(addresses["nodes"][2], 0, 100, "0x");
    await book.mint(addresses["nodes"][3], 1, 100, "0x");
    await book.mint(addresses["nodes"][4], 1, 100, "0x");
    await book.mint(addresses["nodes"][5], 2, 100, "0x");
    await book.mint(addresses["nodes"][6], 2, 100, "0x");
    
    const Valve = await hre.ethers.getContractFactory("Valve");

    valves = []
    await addresses["nodes"].forEach((e)=>{
      valve = Valve.attach(e);
      valves.push(valve);
    })
    await valves.forEach((e)=>{
      e.setPercents();
    })

    await book.mint(env["beneficiary"][0], 3, 100, "0x");
    await book.mint(env["beneficiary"][0], 4, 100, "0x");
    await book.mint(env["beneficiary"][1], 4, 100, "0x");
    await book.mint(env["beneficiary"][1], 5, 100, "0x");
    await book.mint(env["beneficiary"][2], 5, 100, "0x");
    await book.mint(env["beneficiary"][2], 6, 100, "0x");

}



main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  