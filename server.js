const express = require('express');

const app = express();
app.listen(3000);

app.use(express.static("public"))  // This allows us to server static html files.
app.use(express.urlencoded({ extended: true })) //This allos us to decode the request body.
app.use(express.json()) //This allows us to parse json data.

// Make a call to chatGPT to get information
app.post('/api', (req, res) => {
    console.log(req.body.inputQuery)
    res.send({
        original: '<span class="verb">Original updated</span>',
        corrected: '<span class="verb">corrected updated</span>',
        instructions: '<span class="subject">Instructions updated</span>'
    })
})













