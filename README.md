# FinStack XR Project

This project demonstrates a multi-chain payment and whitelisting system that integrates with both Ethereum-compatible networks (EVM sidechains) and the XRP Ledger (XRPL). The system includes:

- **Backend**: Built with Node.js, Express, and Ethers.js, handling deployment of smart contracts, KYC whitelisting, and payment routing.
- **Frontend**: A React-based interface for admin functionalities (user creation, whitelisting) and a payment module for cross-border transactions.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Key Components](#key-components)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Deploying Contracts](#deploying-contracts)
- [API Endpoints](#api-endpoints)
- [Hardhat for Smart Contracts](#hardhat-for-smart-contracts)
- [Notes & Future Enhancements](#notes--future-enhancements)

---

## Project Structure

A simplified view of the repository:

```
finstack-xr/
  backend/
    contracts/
    routes/
    services/
    test/
    .env
    hardhat.config.js
    package.json
  frontend/
    src/
    public/
    package.json
  .gitattributes
  README.md
```

---

## Key Components

### Backend (Node.js & Express)
- Sets up REST endpoints in the `routes` folder (`auth`, `payment`, `compliance`).
- Uses `ethers` to interact with Ethereum-compatible networks.
- Integrates XRPL via the `xrpl` library for testnet wallets.
- Logic for deploying, whitelisting, and calling methods on the `Whitelist` and `Payment` contracts.

### Smart Contracts (Solidity)
- **Whitelist.sol**: Stores addresses that pass KYC checks.
- **Payment.sol**: Validates sender and receiver are whitelisted before initiating a `crossBorderPay` event.

### Frontend (React)
- **AdminPortal.js**: Admin interface for user creation and whitelisting.
- **PaymentModule.js**: Collects from/to addresses and amounts, triggering transactions on the `Payment` contract.

### Hardhat
- Used for testing and deploying the contracts.
- Basic test scripts are in `backend/test`.

---

## Prerequisites

- Node.js (>= 14.x recommended)
- NPM or Yarn
- (Optional) Hardhat CLI for convenience
- A valid RPC URL for an Ethereum-compatible network
- A private key with testnet/mainnet funds if real deployment is desired

---

## Installation & Setup

### Backend Setup

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   npm install
   ```

2. Create a `.env` file with these values:
   ```env
   PORT=3001
   XRPL_ENDPOINT=wss://s.altnet.rippletest.net:51233
   EVM_RPC_URL=YOUR_TESTNET_OR_MAINNET_RPC_URL
   PRIVATE_KEY=YOUR_PRIVATE_KEY
   WHITELIST_ADDRESS=DEPLOYED_WHITELIST_ADDRESS
   PAYMENT_CONTRACT_ADDRESS=DEPLOYED_PAYMENT_CONTRACT_ADDRESS
   ```

### Frontend Setup

1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   npm install
   ```

2. (Optional) Update any required config in the React code (e.g., backend URL).

---

## Environment Variables

The backend uses the following environment variables in `.env`:

- `PORT`: Port for the Express server (default 3001).
- `XRPL_ENDPOINT`: XRPL WebSocket endpoint.
- `EVM_RPC_URL`: Ethereum-compatible network RPC endpoint.
- `PRIVATE_KEY`: Private key with funds to deploy and interact with contracts.
- `WHITELIST_ADDRESS`: Deployed `Whitelist` contract address.
- `PAYMENT_CONTRACT_ADDRESS`: Deployed `Payment` contract address.

---

## Running the Project

### Backend

From the `backend` folder:
```bash
npm run dev
```

### Frontend

From the `frontend` folder:
```bash
npm start
```

Your React app (port 3000 by default) will display the AdminPortal and PaymentModule pages.

---

## Deploying Contracts

1. In the `backend` folder, prepare a deployment script (or use `evmService.js`).
2. Use Hardhat scripts to deploy `Whitelist` and `Payment` contracts.
3. Copy the deployed addresses into your `.env`.
4. Restart the backend to pick up the addresses.

---

## API Endpoints

- **Auth** (`/api/auth/sign-up`): Creates an XRPL wallet, whitelists it, and stores user data.
- **Payment** (`/api/payment/pay`): Calls `crossBorderPay` on the `Payment` contract.
- **Compliance** (`/api/compliance/flagged`): (Mock) Returns flagged transactions.

---

## Hardhat for Smart Contracts

- `hardhat.config.js` configures compilation.
- Example tests can be found in `test/Lock.js` using Mocha and Chai.
- Commands:
  ```bash
  npx hardhat test
  npx hardhat node
  ```

---

## Notes & Future Enhancements

- **Security**: Implement access control for admin routes. Never commit private keys.
- **Stablecoin Transfer**: `Payment.sol`’s `crossBorderPay` is a placeholder. Real usage would involve ERC-20 transfer logic.
- **Database**: Replace the mock in-memory array with a real database for production.
- **Frontend Validation**: Add robust form validation.
- **XRPL Funding**: For production, manage real addresses/funds or run your own XRPL node if needed.

---

Thank you for checking out FinStack XR. For any questions or contributions, please open an issue or a pull request in the repository.
