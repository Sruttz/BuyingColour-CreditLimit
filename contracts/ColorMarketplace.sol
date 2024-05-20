//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ColorMarketplace {
    mapping(string => uint) public colorBalances;
    uint public totalCredits = 100;

    constructor() {
        colorBalances["red"] = 40;
        colorBalances["blue"] = 40;
        colorBalances["green"] = 30;
    }

    function buyColour(string memory colour, uint price) public payable {
        require(price > 0, "Price must be greater than zero");

        if (compareStrings(colour, "red")) {
            require(colorBalances["red"] >= price, "Not enough red credits available");
            require(price <= 40, "Maximum limit for red exceeded");
            colorBalances["red"] -= price;
        } else if (compareStrings(colour, "blue")) {
            require(colorBalances["blue"] >= price, "Not enough blue credits available");
            require(price <= 40, "Maximum limit for blue exceeded");
            colorBalances["blue"] -= price;
        } else if (compareStrings(colour, "green")) {
            require(colorBalances["green"] >= price, "Not enough green credits available");
            require(price <= 30, "Maximum limit for green exceeded");
            colorBalances["green"] -= price;
        } else {
            revert("Invalid color choice");
        }
        totalCredits -= price;
    }

    function credits() public view returns (uint) {
        return totalCredits;
    }

    function compareStrings(string memory a, string memory b) internal pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }
}