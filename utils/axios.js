// use .env variables
require("dotenv").config();

const axios = require("axios");

const { API_KEY, API_URL } = process.env;

const headers = {
  "Content-Type": "application/json",
  Authorization: API_KEY,
};

const monday = async query => {
  try {
    return await axios.post(API_URL, { query: query }, { headers: headers });
  } catch (err) {
    console.log(err);
  }
};

module.exports = monday;
