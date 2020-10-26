require('dotenv').config();
const axios = require('axios');
const headers = {
  "Content-Type": "application/json",
  Authorization: process.env.API_KEY,
};

let url = process.env.API_URL;

const monday = async query => {
  try {
    return await axios.post(url, { query: query }, { headers: headers });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = monday;
