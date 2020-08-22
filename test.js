const axios = require("axios");

async function getEmail(userName) {
  const url = `https://api.github.com/users/${userName}/events/public`;
  const resp = await axios.get(url);
  console.log(resp.data);
}

getEmail('Akshay090');