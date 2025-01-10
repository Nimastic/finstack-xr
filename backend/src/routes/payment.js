const express = require('express');
const router = express.Router();
const { ethers } = require('ethers');
const { EVM_RPC_URL, PRIVATE_KEY } = require('../config');
const paymentAbi = require('../contracts/Payment.json').abi;
const PAYMENT_CONTRACT_ADDRESS = process.env.PAYMENT_CONTRACT_ADDRESS;

const provider = new ethers.providers.JsonRpcProvider(EVM_RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

router.post('/pay', async (req, res) => {
  try {
    const { fromAddress, toAddress, amount, reference } = req.body;
    // In real life, you'd handle stablecoin transfer. 
    // Here we just call the contract function that checks whitelisting.

    const paymentContract = new ethers.Contract(
      PAYMENT_CONTRACT_ADDRESS,
      paymentAbi,
      wallet
    );

    const tx = await paymentContract.crossBorderPay(toAddress, amount, reference);
    const receipt = await tx.wait();

    res.json({
      message: 'Payment initiated successfully',
      transactionHash: receipt.transactionHash
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Payment error', details: error.message });
  }
});

module.exports = router;
