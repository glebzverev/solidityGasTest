const env = require("../env");
const { config } = require("chai");
const hre = require("hardhat");
const { isConstructorDeclaration } = require("typescript");

// const {deploy_book} = require("./book.js");

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


async function valveDeploy(book_address, index){
    const Valve = await hre.ethers.getContractFactory("Valve")
    const valve = await Valve.deploy(book_address, index);
    await valve.deployed().then(() => {
      console.log(
          `valve  deployed to ${valve.address}`
      );
      valve.setPercents()
    });
    return valve;
}

// async function valveDeploy()

async function main(){
    // await valveDeploy(env["beneficiary"][0], 0)
    const book = await deploy_book();
}



main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  