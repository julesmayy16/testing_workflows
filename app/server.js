require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Function to get the required parameters for Alloy
async function getAlloyParameters(authHeader) {
  try {
    const response = await axios.get('https://sandbox.alloy.co/v1/parameters/', {
      headers: { 'Authorization': authHeader },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch parameters: ${error.message}`);
  }
}

// Endpoint to handle form submission
app.post('/submit', async (req, res) => {
  const applicantData = req.body;
  console.log('request: ' + JSON.stringify(req.body));

  const authHeader = 'Basic ' + Buffer.from(`${process.env.ALLOY_API_KEY}:${process.env.ALLOY_API_SECRET}`).toString('base64');

  try {
    // Get the required parameters from Alloy API
    const parameters = await getAlloyParameters(authHeader);
    console.log('parameters: ' + JSON.stringify(parameters));

    // Validate or format the applicantData based on retrieved parameters if needed

    // Submit the evaluation to Alloy API
    const response = await axios.post('https://sandbox.alloy.co/v1/evaluations/', applicantData, {
      headers: { 'Authorization': authHeader },
    });

    // Check if the response includes {"summary":{"outcome":"Approved"}}
    if (response.data.summary && response.data.summary.outcome === 'Approved') {
      res.json({ message: "Success! The customer has successfully created an account with your service." });
    } else if (response.data.summary && response.data.summary.outcome === 'Manual Review') {
      res.json({ message: 'Thanks for submitting your application, we’ll be in touch shortly' });
    } else if (response.data.summary && response.data.summary.outcome === 'Deny') {
      res.json({ message: 'Sorry, your application was not successful' });
    } else {
      res.json({ message: "The evaluation was not approved. Please try again or contact support.", details: response.data });
    }

    console.log('response: ' + JSON.stringify(response.data));
  } catch (error) {
    console.error('Error: ', error.message);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
