const express = require('express');
const bodyParser = require('body-parser')
const fs = require("fs");
const jison = require("jison");
const path = require('path');

const hostname = 'localhost';
const port = 5000;

const app = express();

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

var router = express.Router();
const grammar = fs.readFileSync("./grammar/grammar.jison", "utf8");
router.use(bodyParser.json());



app.use(allowCrossDomain);
router.use(express.static(__dirname + "/../dist"));
router.route('/compile')
.post(function (req, res) {
    var response;
    try{
        const parser = new jison.Parser(grammar);
        response = parser.parse(req.body.code);
    }catch(e){
        response = {
            error: e.toString()
        }
    }
    res.json(response);
    console.log(typeof response.error);
});

router.route('/')
.get(function (req, res) {
    res.sendFile(path.resolve(__dirname + "/../dist/index.html"));
});


app.use(router);

app.listen(port, hostname, function() {
    console.log("le serveur fontionne sur http://" + hostname + ":" + port);
});