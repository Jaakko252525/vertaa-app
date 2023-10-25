// Import required modules
import { Server } from 'socket.io';
// Create a Socket.IO server on port 3005 with CORS options
const io = new Server(3005, {
    cors: {
        origin: '*'
    }
});
// Handle incoming connections
io.on('connect', (socket) => {
    // Listen for 'joining-room' event
    socket.on('joining-room', (room) => {
        // Join the specified room
        socket.join(room);
        // Listen for 'message' event
        socket.on('message', (msg) => {
            console.log('message from client:', msg);
            // Send the message to all clients in the room
            io.to(room).emit('message-back-to-client', msg);
        });
    });
});
/*



const io = require('socket.io')(3005, {
    cors: {
        origin: '*'
    }
})


io.on('connect', socket => {

    socket.on('joining-room', (room: string) => {
        
        
        // joining room
        socket.join(room);

        socket.on('message', (msg: string) => {

            console.log('message from client:', msg)
    
            // sending message to room
            io.to(room).emit("message-back-to-client", msg);
        })
    })



})
*/
