

const io = require('socket.io')(3003, {
    cors: {
        origin: '*'
    }
})



//@ts-ignore
io.on('connection', (socket) => {

    console.log(`User connected: ${socket.id}`)

    // emit to sending message to backend
    socket.on('message-event', (message: string) => {

        console.log(message)

        // sending message back to frontend
        socket.broadcast.emit('receive-message', message)

    })

})








