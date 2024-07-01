const core = require('@actions/core');
const axios = require('axios');

async function run() {
  try {
    const apiUrl = core.getInput('api_url');
    const login = core.getInput('login');
    const password = core.getInput('password');
    const command = core.getInput('command');
    const id = core.getInput('id');

    const authUrl = `${apiUrl}/auth/login`;
    const itemUrl = `${apiUrl}/item/${command}/${id}`;

    console.log(`authUrl: ${authUrl}`);
    console.log(`itemUrl: ${itemUrl}`);

    // Авторизация
    const authResponse = await axios.post(authUrl, {
      login: login,
      password: password
    });

    const token = authResponse.data.tokken;
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    console.log(`token: ${token}`);

    // Запрос к item
    const itemResponse = await axios.get(itemUrl, { headers: headers });

    console.log(itemResponse.data);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();