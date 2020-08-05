const express = require('express');
const userRouter = require('./api/user/user.route');
const db = require('./config/database');
require("dotenv").config();
const app = express()

app.use(express.json());
const PORT = process.env.PORT || 5000; 

app.use('/', userRouter);

app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
});