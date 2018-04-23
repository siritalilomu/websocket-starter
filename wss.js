const WebSocket = require ('ws');
const wss = new WebSocket.Server({ port: 8080 });

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

