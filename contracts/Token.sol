// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20{
    address public owner;

    constructor (string memory name, uint256 amount) ERC20(name, name){
        _mint(msg.sender, amount);
        owner = msg.sender; 
    }

}