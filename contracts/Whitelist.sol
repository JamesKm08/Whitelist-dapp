// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Whitelist {

    //Declare a variable to check the number of addresses whitelisted
    uint256 public numWhitelistedAdd;

    //mapping the addresses to a boolean value.
    //True if whitelisted, false if not
    mapping(address => bool) public whitelistedAddresses;

        
    //Declaring the max number of addresses allowed in the whitelist
    uint256 public maxAddressNo;

    //setting the max no. which will be placed in deployment
    constructor(uint256 _maxAddressNo) {
        maxAddressNo = _maxAddressNo;
        }

    //Adding the address to the whitelist
    function addAddress() public {
        //Ensure the address added is not in the whitelist already
        require(!whitelistedAddresses[msg.sender],
        "This sender is already whitelisted!"
                );
        
        //Ensure the number of the whitelisted addresses doesn't pass it's maximum value
        require(numWhitelistedAdd <= maxAddressNo,
        "Max number of whitelisted address has reached!"
                );
        whitelistedAddresses[msg.sender] = true;
        numWhitelistedAdd += 1;
    }
}