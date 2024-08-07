const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors
const jobRoutes = require('./routes/jobs');
require('dotenv').config();

const app = express();

app.use(cors()); // Use cors middleware
app.use(bodyParser.json());
app.use('/api', jobRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


