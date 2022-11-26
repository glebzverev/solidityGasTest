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

// async function main(){
//     const book = await deploy_book()
//     var data = []
//     env['beneficiary'].forEach((e,index, _)=>{
//         data.push([e,0,100*(index+1)]);
//     })
//     data.forEach( (e, index, _) => {
//         book.mint(e[0],e[1],e[2],"0x").then((_, err) =>{
//             if (err) 
//               console.log(err);
//             else{
//               book.percents(e[1],index).then(console.log)
//             }
//         });
//     });
// }



// main().catch((error) => {
//     console.error(error);
//     process.exitCode = 1;
//   });
  