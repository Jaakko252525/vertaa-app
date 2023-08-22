






const io = require('socket.io')(3005, {
    cors: {
        origin: '*'
    }
})


//@ts-ignore
io.on('connect', socket => {

    console.log('connected', socket.id)

    // event to get messages from client
    socket.on('send-message', (msg: string, room: string) => {

        // message only to specific room
        socket.to(room).emit('message back to client', msg)
        

    })



})


