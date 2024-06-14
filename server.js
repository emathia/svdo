const express = require('express');

const app = express();

app.use(express.static("public"))  // This allows us to server static html files.
app.use(express.urlencoded({ extended: true })) //This allos us to decode the request body.
app.use(express.json()) //This allows us to parse json data.

// Make a call to chatGPT to get information
app.post('/', (req, res) => {
    console.log(req.body.inputQuery)
    res.status(200)
})



app.listen(3000);










