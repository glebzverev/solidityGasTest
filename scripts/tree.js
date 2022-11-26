const env = require("../env");
const { config } = require("chai");
const hre = require("hardhat");
const { isConstructorDeclaration } = require("typescript");

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
    //   valve.setPercents()
    });
    return valve;
}

async function treeDeploy(book_address, amount){
    valves = []
    for (var i = 0; i < amount; i++){
        var valve = await valveDeploy(book_address, i)
        valves.push(valve);
    }
    return valves;
}

// async function valveDeploy()

async function main(){
    // await valveDeploy(env["beneficiary"][0], 0)
    const beneficicary = env["beneficiary"];
    const book = await deploy_book();
    const valves = await treeDeploy(book.address, 6)
    console.log(valves[1].address);

    valves[1].setPercents();
    await book.mint(valves[1].address, 0, 100, "0x").then((_, err) =>{
        if (err) 
          console.log(err);
        else{
          book.percents(0,0).then(console.log)
        }
      })
}



main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  