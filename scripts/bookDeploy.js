const { config } = require("chai");
const hre = require("hardhat");
const { isConstructorDeclaration } = require("typescript");

async function main(){

  const Token = await hre.ethers.getContractFactory("Token");
  
  const token = await Token.deploy("heart", String(10**18));
  await token.deployed().then(() =>{
    console.log(
        `token  deployed to ${token.address}`
    );
  });

  let owner = await token.owner();

  await token.balanceOf(owner).then(console.log);


  const Book = await hre.ethers.getContractFactory("MyBook");
  
  const book = await Book.deploy();
  await book.deployed().then(() =>{
    console.log(
        `book deployed to ${book.address}`
    );
  });

  // 0x5FbDB2315678afecb367f032d93F642f64180aa3

  const my_addr = "0x328c3155052e0205f523c154a74476aabb70e106";
  await book.mint(my_addr,0,100,"0x").then((_, err) =>{
      if (err) 
        console.log(err);
      else{
        book.percents(0,0).then(console.log)
      }
    })
  
  const another = "0xd0744bb9df5b1ba72cf8ed0acb845e60b74a30ac";

  await book.mint(another,0,100,"0x").then((_, err) =>{
      if (err) 
        console.log(err);
      else{
        book.percents(0,1).then(console.log)
      }
    })

  const Valve = await hre.ethers.getContractFactory("Valve");
  
  const valve = await Valve.deploy(book.address, 0);
  await valve.deployed().then(() =>{
    console.log(
        `valve  deployed to ${valve.address}`
    );
    valve.setPercents();
  });
  await token.transfer(valve.address, String(10**18));
  await valve.Split(token.address)
  await token.balanceOf(another).then(console.log);
  await token.balanceOf(my_addr).then(console.log);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
