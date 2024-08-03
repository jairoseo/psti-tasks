const express = require("express");
require("dotenv").config();
const api = require('./api');

const app = express();
app.use(express.json());

app.use('/api', api);

app.get('/', function (req, res) {
    res.redirect('/api/all-task');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is listening at port: " + PORT);
});