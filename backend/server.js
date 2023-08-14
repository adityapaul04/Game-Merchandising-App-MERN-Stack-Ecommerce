const app = require('./app')
const connectDatabase = require('./config/database')

const dotenv = require('dotenv');
const cloudinary = require('cloudinary')

const express = require('express');
const bodyParser = require('body-parser');

// Set the maximum payload size to 50MB (or your desired limit)
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


//Handle the uncaught exceptions
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log("Shutting down the server due to uncaught exception");
    process.exit(1)
})

//Setting up the config file
dotenv.config({ path: 'backend/config/config.env' })

//Connecting to the database
connectDatabase();

// Setting up cloudinary cofiguration
cloudinary.config({
    cloud_name: 'dyrmvi2ye',
    api_key: '151922216486646',
    api_secret: 'JKkzeNuCEyn6M3vvHU3sHxviS9I'
});

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})

//Handling the unhandled promise rejections
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.message}`)
    console.log("Shutting down the server due to unhandled promise rejection");
    server.close(() => {
        process.exit(1)
    })
})