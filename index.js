require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./src/routes/routes.js');
const cors = require('cors');
const app = express();
const PORT  = process.env.APP_PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.get("/", (req, res) => { 
    res.sendFile(path.join(__dirname, 'html/index.html'));
});
app.use(router);
app.listen(PORT, () => {
  console.log(`server running port: ${PORT}`);
});