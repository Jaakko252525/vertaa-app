


// bootstrap
import { Button } from "react-bootstrap";

// state and effect
import { useEffect, useState } from "react"


// socket io connection
import { socket } from "../socketIoConnection";

// Chatroom component
const Chatroom = () => {

    const [messages, setMessages] = useState('')
    const [socketId, setSocketId] = useState('')

    // socket io room
    const [room, setRoom] = useState('')

    const [messageFromBE, setMessageFromBE] = useState('')

 
    useEffect(() => {

        console.log('here')
        socket.on('connect', () => {
            console.log(socket.id)
            setSocketId(socket.id)
        } )
    })

    useEffect(() => {

 

        console.log('getting backe the message')
        // getting message from backend
        socket.on('message back to client', (msg: string) => {

            setMessageFromBE(msg)


        })
    })

    
    // function to send messages
    const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        console.log('sending message')

        // sending message to backend
        await socket.emit('send-message', messages, room)




    }





    return (
        <div>
            <h1>ID: {socketId} </h1>
            <h1>Huone {room}</h1>
            <form onSubmit={sendMessage} >

                Message: <input 
                  value={messages}
                  onChange={(e) => setMessages(e.target.value)}
                />
                Room: <input  
                  value={room}
                  onChange={ e => setRoom(e.target.value)}
                />
                
                <Button type="submit" >Send message</Button>

            </form>

            <p>{messageFromBE}</p>
        </div>
    )
}



export default Chatroom











