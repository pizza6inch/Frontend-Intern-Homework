import axios from "axios";
const axios = require("axios");

const gitAPI = axios.create({
  baseURL: "https://github.com/login/oauth",
});
