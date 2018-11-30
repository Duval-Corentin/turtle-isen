const express = require('express');
const bodyParser = require('body-parser')
const fs = require("fs");
const jison = require("jison");

const hostname = 'localhost';
const port = 3500;

var app = express();
var router = express.Router();

const grammar = fs.readFileSync("./grammar/grammar.jison", "utf8");


router.use(bodyParser.json());
router.route('/compile')
.post(function (req, res) {
    var response;
    console.log("req:");
    console.log(req.body);
    try{
        const parser = new jison.Parser(grammar);
        response = parser.parse(req.body.code);
        console.log(response);
    }catch(e){
        console.log(String(e));
        response = {
            error: e
        }
    }

    res.json(response);
});


app.use(router);

app.listen(port, hostname, function() {
    console.log("le serveur fontionne sur http://" + hostname + ":" + port);
});