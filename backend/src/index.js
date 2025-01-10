const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { PORT } = require('./config');

// Routes
const authRoutes = require('./routes/auth');
const paymentRoutes = require('./routes/payment');
const complianceRoutes = require('./routes/compliance');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/compliance', complianceRoutes);

app.get('/', (req, res) => {
  res.send('FinStack XR Backend is running');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
