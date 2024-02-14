// loads .env files into process.env
require('dotenv').config() //Loads .env file contents into process.env by default.

// import express
const express = require('express');

// import cors
const cors = require('cors');

// importing route
const router = require('./Router/route');

const db = require('./DB/connection')

const appMiddleware = require("./Middlewares/appMiddleware")

const jwtMiddleware = require("./Middlewares/jwtMiddleware")

// create a backend application using express 
const pfServer = express()
// use
pfServer.use(cors())
pfServer.use(express.json())
pfServer.use(router)
// pfServer.use(appMiddleware)
//to export image  from server to client
pfServer.use('/uploads',express.static('./uploads'))

// port creation
const PORT = 4000 || process.env.PORT

// server listen
pfServer.listen(PORT, () => {
    console.log('server listening on the port' + PORT);
})

// http - get resolving to http://localhost4000
pfServer.get("/", (req, res) => {
    res.send(`<h1>Project Fair is Started....</h1>`)
})