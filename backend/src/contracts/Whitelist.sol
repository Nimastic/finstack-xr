// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/**
 * @title Whitelist
 * @dev Stores addresses that have passed KYC checks
 */
contract Whitelist {
    mapping(address => bool) private whitelisted;

    event UserWhitelisted(address indexed user);
    event UserRemoved(address indexed user);

    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not contract owner");
        _;
    }

    function addUser(address _user) external onlyOwner {
        whitelisted[_user] = true;
        emit UserWhitelisted(_user);
    }

    function removeUser(address _user) external onlyOwner {
        whitelisted[_user] = false;
        emit UserRemoved(_user);
    }

    function isWhitelisted(address _user) external view returns (bool) {
        return whitelisted[_user];
    }
}
