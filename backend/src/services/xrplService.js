const xrpl = require('xrpl');
const { XRPL_ENDPOINT } = require('../config');

async function createXrplWallet() {
  const client = new xrpl.Client(XRPL_ENDPOINT);
  await client.connect();

  // Generate a new wallet (Testnet)
  const wallet = (await client.fundWallet()).wallet;
  
  await client.disconnect();

  return {
    address: wallet.classicAddress,
    seed: wallet.seed
  };
}

// Additional XRPL logic (e.g., stablecoin transfer)...

module.exports = {
  createXrplWallet
};
