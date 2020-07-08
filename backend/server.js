const bodyParser = require('body-parser');
const env = require('dotenv');
const express = require('express');
const http = require('http');
const cors = require('cors');

const router = require('./routes');
env.config();
const { PORT = 3002, BASE_URL = '/' } = process.env;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(BASE_URL, router);

app.set('port', PORT);
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Service is running on localhost:${PORT}`);
});
module.exports = server;
