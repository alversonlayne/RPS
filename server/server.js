const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();

const clientPath = `${__dirname}/../client`;
console.log(`Serving static from ${clientPath}`);

// Static middleware indicating where to serve static files from
app.use(express.static(clientPath));

const server = http.createServer(app);

const io = socketio(server);

let waitingPlayer = null;

io.on('connection', (sock)=>{

    if (waitingPlayer) {
        // start a game

        waitingPlayer = null;
    } else {
        waitingPlayer = sock;
        waitingPlayer.emit('message', 'Waiting for an opponent')
    }

    sock.on('message', (text) => {
        io.emit('message', text);
    });
});

server.on('error', () => {
    console.error('Server error:', err);
});

server.listen(8080, ()=> {
    console.log('RPS started on 8080');
});