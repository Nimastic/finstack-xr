const express = require('express');
const router = express.Router();

// Mock example: just an array of "flagged" transactions
let flaggedTxs = [];

router.get('/flagged', (req, res) => {
  res.json(flaggedTxs);
});

// Possibly include logic that checks amounts above a threshold and pushes to flaggedTxs
// For demonstration only.

module.exports = router;
