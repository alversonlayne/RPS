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

io.on('connection', (sock)=>{
    console.log('Someone connected');
    sock.emit('message', 'Hi, you are connected');

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