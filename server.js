const express = require('express');
const http = require('http');
const socketInfo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketInfo(server);
app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('Connected....');

    // Chat message
    socket.on('chat message', (message) => {
        if (message.includes('kill')) {
            socket.emit('chat message', 'Message Blocked');
            return;
        }
        if (message.includes('ipl')) {
            message = 'Indian Premier League:' + message;
        }
        io.emit('chat message', message);
    });

    // Leave permission
    socket.on('leave permission', (message) => {
        if (message.includes('ipl')) {
            message = 'Leave Denied: '+ message;
            socket.emit('leave permission',message);
        } else {
            socket.emit('leave permission', 'Leave Accepted!');
        }
        
    });

    // Purchase
    socket.on('purchase', (message) => {
        if (message.includes('today')) {
            socket.emit('purchase', 'Cannot process any orders today..');
        } else {
            socket.emit('purchase', 'Happy Purchase!');
        }
    });
});

// Port
const port = 3000;
server.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
