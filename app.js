var express = require('express'),
    https = require('https'),
    fs = require('fs'),
    privateKey = fs.readFileSync('/etc/letsencrypt/live/api.hugefantacy.in/privkey.pem'),
    cert = fs.readFileSync('/etc/letsencrypt/live/api.hugefantacy.in/fullchain.pem'),
    bodyParser = require('body-parser'),
    app = express();


var server = https.createServer({
    key: privateKey,
    cert: cert
}, app).listen(process.env.PORT || 443, function () {
    var host = server.address().address;
    var port = server.address().port;
    server.timeout = 720000;
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, HEAD");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Content-Type, Accept,application/json-patch, Authorization, x-access-token, x-access-key, X-CSRF-Token");
    if (req.url.substr(-1) == '/') {
        return res.send({
            message: "welcome to hugefantacy.in"
        });
    }
    next();
});

app.use(bodyParser.json({limit: '1024mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '1024mb', extended: true}));

app.use('/', require('./routes'));