const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');
const app = express();

//To record response time in the response header
const responseTime  = require('response-time');
//MiddleWares

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api', require('./middleware/routes'));

//PORT

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started  on port : ${PORT}`));
