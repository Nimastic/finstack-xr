require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3001,
  XRPL_ENDPOINT: process.env.XRPL_ENDPOINT || 'wss://s.altnet.rippletest.net:51233',
  EVM_RPC_URL: process.env.EVM_RPC_URL || 'https://evmsidechain-testnet.example/rpc',
  PRIVATE_KEY: process.env.PRIVATE_KEY || '', // For contract deployment or signing
  // Additional config as needed
};
