const { config } = require("chai");
const hre = require("hardhat");
const { isConstructorDeclaration } = require("typescript");
var fs = require('fs');

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
      )
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

async function main(){
    // const beneficicary = env["beneficiary"];
    const book = await deploy_book();
    const valves = await treeDeploy(book.address, 7)
    console.log(valves[1].address);
    data = {"nodes": []}

    await valves.forEach(element => {
      data["nodes"].push(element.address);
    });
    data["book"] = book.address;
    
    console.log(data)
    var jsonData = JSON.stringify(data);
    
    await fs.writeFile("./scripts/valve.json", jsonData, function(err) {
      if (err) {
          console.log(err);
      }
    });
}



main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  