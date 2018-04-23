var express = require('express');

const WebSocket = require ('ws');
// const wss = new WebSocket.Server({ port: 8080 });
var serveStatic = require('serve-static');
var app = express();
// use for heroku
// app.use(serveStatic(__dirname + "/"));
// use for local
app.use(express.static('public'));

app.set('port', (process.env.PORT || 5050));

var server = app.listen(app.get('port'), function() {
    console.log("Server is listening...");
    var wss = new WebSocket.Server({ server: server });

    // Brodcast all to all clients whenever I want
    wss.brodcast = function brodcast(data) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    };

    wss.on('connection', function connection(ws) {
        ws.on('message', function incoming(data) {
            // This is checking the client and when they send a messeage
            // brodcast the message
            wss.clients.forEach(function each(client) {
                // if (client !== ws && client.readyState === WebSocket.OPEN) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(data);
                }
            });
        });
    });
});
