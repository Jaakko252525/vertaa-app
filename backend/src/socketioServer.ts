






const io = require('socket.io')(3005, {
    cors: {
        origin: '*'
    }
})


//@ts-ignore
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


