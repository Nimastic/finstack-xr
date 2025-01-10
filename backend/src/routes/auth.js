const express = require('express');
const router = express.Router();
const { createXrplWallet } = require('../services/xrplService');
const { whitelistUser } = require('../services/evmService');
const whitelistAbi = require('../contracts/Whitelist.json').abi; // Assumes we compiled it
const WHITELIST_ADDRESS = process.env.WHITELIST_ADDRESS; // After deployment

// Mock user database
let usersDB = [];

/**
 * Simulate KYC by automatically whitelisting user in the EVM contract
 */
router.post('/signup', async (req, res) => {
  try {
    const { email } = req.body;
    // 1. Generate XRPL wallet for the user
    const wallet = await createXrplWallet();
    // 2. Fake KYC pass => add to EVM whitelist
    await whitelistUser(whitelistAbi, WHITELIST_ADDRESS, wallet.address);

    // 3. Store user in a mock DB
    const newUser = {
      email,
      xrplAddress: wallet.address,
      xrplSeed: wallet.seed
    };
    usersDB.push(newUser);

    res.json({ message: 'User created & whitelisted', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Signup error' });
  }
});

module.exports = router;
