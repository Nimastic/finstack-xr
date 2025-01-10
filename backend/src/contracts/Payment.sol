// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface IWhitelist {
    function isWhitelisted(address _user) external view returns (bool);
}

/**
 * @title Payment
 * @dev Simple contract that checks whitelisting on an external Whitelist contract 
 */
contract Payment {
    IWhitelist public whitelist;

    event PaymentInitiated(
        address indexed from,
        address indexed to,
        uint256 amount,
        string reference
    );

    constructor(address _whitelist) {
        whitelist = IWhitelist(_whitelist);
    }

    function crossBorderPay(address _to, uint256 _amount, string memory _ref) external {
        require(whitelist.isWhitelisted(msg.sender), "Sender not whitelisted");
        require(whitelist.isWhitelisted(_to), "Receiver not whitelisted");
        // For demonstration only: 
        // Real stablecoin transfer logic would call an ERC20 contract here.
        // E.g., stablecoin.transferFrom(msg.sender, _to, _amount);

        emit PaymentInitiated(msg.sender, _to, _amount, _ref);
    }
}
