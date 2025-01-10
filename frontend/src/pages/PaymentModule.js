import React, { useState } from 'react';
import axios from 'axios';

function PaymentModule() {
  const [fromAddress, setFromAddress] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState(0);
  const [reference, setReference] = useState('');
  const [status, setStatus] = useState('');

  const handlePayment = async () => {
    try {
      const res = await axios.post('http://localhost:3001/api/payment/pay', {
        fromAddress,
        toAddress,
        amount,
        reference
      });
      setStatus(`Payment successful! Tx: ${res.data.transactionHash}`);
    } catch (err) {
      setStatus(`Error: ${err.response?.data?.error || err.message}`);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Cross-Border Payment</h1>
      <div style={{ marginBottom: '8px' }}>
        <label>From (XRPL Address): </label>
        <input
          value={fromAddress}
          onChange={(e) => setFromAddress(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: '8px' }}>
        <label>To (XRPL Address): </label>
        <input
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: '8px' }}>
        <label>Amount: </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: '8px' }}>
        <label>Reference: </label>
        <input
          value={reference}
          onChange={(e) => setReference(e.target.value)}
        />
      </div>
      <button onClick={handlePayment}>Send Payment</button>
      <p>{status}</p>
    </div>
  );
}

export default PaymentModule;
