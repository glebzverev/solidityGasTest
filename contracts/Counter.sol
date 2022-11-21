// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Counter {
    uint256 public counter = 0;

    function Count(uint256 am) external returns(uint256) {
        uint256 amount = 0;
        for(uint256 i = 0; i < am; i++){
            amount++;
        }
        counter = amount;
        return amount;
    }

    function Call(uint256 _gas, uint256 _amount, address _addr) public returns(uint256 myAmount, string memory myString){
        (bool success, bytes memory data) = _addr.call{gas:_gas}(
            abi.encodeWithSignature(
                "Count(uint256)", _amount
            )
        );
        return (1, "string");
    }

    function countGas(uint256 _range) external view returns(uint256, uint256){
        uint256 startGas = gasleft();

        for (uint i = 0; i<_range; i++){}
    
        uint256 gasUsed = startGas - gasleft();
        return (gasUsed, startGas);
    }
}
