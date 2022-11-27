// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./MyBook.sol";
import "./Utils.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

contract Book is Utils{

    address public bookAddr;
    uint256 public index;
    constructor(address _bookAddr, uint256 _index){
        bookAddr = _bookAddr;
        index = _index;
    }


    uint branchCount = 0;

    uint256 public sumPercent;

    Percent[] public percents;

    function setPercents() public {
        Percent[] memory _percents = MyBook(bookAddr).returnPercents(index);
        delete percents; 
        sumPercent = 0;
        for (uint256 i =0; i<_percents.length; i++){
            percents.push(_percents[i]);
            sumPercent+=_percents[i].percent;
        }
        branchCount = _percents.length;
    }
}

contract Valve is Book, ERC1155Holder{
    uint256 public lastGasLeft = 0; 
    uint256 public width = 0;
    uint256 public reminderGas = 0;
    bool public here = false;


    constructor(address _bookAddr, uint256 _index) Book(_bookAddr, _index){}

    // function _reminderGas() public returns(uint256){
        // return reminderGas;
    // }

    function Split(address _token) public returns(uint256){
        uint256 startGas = gasleft();

        if (branchCount > 0){            
            width = 0;
            uint256 amount = ERC20(_token).balanceOf(address(this));
            for (uint i = 0; i < branchCount; i++) {
                ERC20(_token).transfer(percents[i].addr, amount * percents[i].percent / sumPercent);
            }        

            uint256 remainderGas = gasleft() / 2 / branchCount;

            uint256 _edge = 0;
            for (uint i = 0; i < branchCount; i++){
                // uint256 start = gasleft();
                (bool success, bytes memory data) = percents[i].addr.call{gas: remainderGas + _edge}(
                    abi.encodeWithSignature(
                        "Split(address)", 
                        _token
                    )
                );
                // _edge = remainderGas - (start - gasleft());
                if (success){
                    width++;
                }
            }

            lastGasLeft = startGas - gasleft();
            reminderGas = startGas - lastGasLeft; 
            return reminderGas;
        }    
    }
} 