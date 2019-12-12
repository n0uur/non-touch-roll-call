// Express API's part

const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const PORT = 3000

var Class_Controller = require('./src/api/Class_Controller')
var Student_Controller = require('./src/api/Student_Contoller')

app.use(bodyParser.json())
app.disable('x-powered-by')

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "*")
    res.header("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
    res.header("Pragma", "no-cache"); // HTTP 1.0.
    res.header("Expires", "0"); // Proxies.
    next()
})

app.use('/class', Class_Controller)
app.use('/std', Student_Controller)

var server = app.listen(PORT, function () {
    console.log("API Listening on PORT: " + PORT)
})
