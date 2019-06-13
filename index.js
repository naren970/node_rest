const express = require('express');
var bodyParser = require('body-parser')
const app = new express();
const port = 3000;

app.use(bodyParser.json());
app.get('/', (req, resp) => {
    console.log(" Req data", req.body);
    resp.send(req.body);
});

module.exports = app;
app.listen(port, (req, res) => {console.log("Application is listing on 3000 port") });