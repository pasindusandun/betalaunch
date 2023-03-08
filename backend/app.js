const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes');

const uri = require('./config/db');



mongoose.connect(uri);

let app = express();

app.use(express.json({ limit: '50mb' }));

app.use(express.urlencoded({ limit: '50mb', extended: true }))

app.use(cors());



app.use('/user', userRouter);//user routes

module.exports = app;