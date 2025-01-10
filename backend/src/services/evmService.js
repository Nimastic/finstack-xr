const { ethers } = require('ethers');
const { EVM_RPC_URL, PRIVATE_KEY } = require('../config');

// Import compiled artifact JSON if using Hardhat/Truffle compile
// For demonstration, assume we have the ABI and bytecode inline

const provider = new ethers.providers.JsonRpcProvider(EVM_RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

async function deployWhitelistContract(abi, bytecode) {
  const factory = new ethers.ContractFactory(abi, bytecode, wallet);
  const contract = await factory.deploy();
  await contract.deployed();
  console.log('Whitelist contract deployed at:', contract.address);
  return contract.address;
}

async function deployPaymentContract(abi, bytecode, whitelistAddress) {
  const factory = new ethers.ContractFactory(abi, bytecode, wallet);
  const contract = await factory.deploy(whitelistAddress);
  await contract.deployed();
  console.log('Payment contract deployed at:', contract.address);
  return contract.address;
}

async function whitelistUser(whitelistContractAbi, whitelistAddress, userAddress) {
  const contract = new ethers.Contract(whitelistAddress, whitelistContractAbi, wallet);
  const tx = await contract.addUser(userAddress);
  await tx.wait();
  console.log(`User whitelisted: ${userAddress}`);
}

// And so forth...

module.exports = {
  deployWhitelistContract,
  deployPaymentContract,
  whitelistUser
};
