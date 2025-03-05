const express = require('express');
const app = express();
require('dotenv').config();
require("./src/db/dbConnection");
const mongoose = require('mongoose');
const port = process.env.PORT || 5001;
const router = require('./src/routers');

// Middleware
app.use(express.json());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));


app.use ('/api', router);


app.get('/', (req, res) => {
  res.json('Home page');
})






app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})