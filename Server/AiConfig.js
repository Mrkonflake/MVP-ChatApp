const { Configuration, OpenAIApi } = require("openai");
const dotenv = require('dotenv').config();

const configuration = new Configuration({
  organization: "org-rPRLNLmBEKtkNom2fe9fsYw0",
  apiKey: process.env.AI_API
});

const openai = new OpenAIApi(configuration);

module.exports = openai;