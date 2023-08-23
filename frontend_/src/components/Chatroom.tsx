


// bootstrap
import { Button } from "react-bootstrap";

// state and effect
import { useEffect, useState } from "react"


// socket io connection
import { socket } from "../socketIoConnection";

// interface
interface chatReqID {
    chatRequestIDProp: string
}


// Chatroom component
const Chatroom = ({ chatRequestIDProp }: chatReqID) => {

    const [messages, setMessages] = useState('')

    const [receivedMessage, setReceivedMessage] = useState('')

    const [currentRoom, setCurrentRoom] = useState('')


    

    useEffect(() => {


        // joining socket io room
        socket.emit('joining-room', chatRequestIDProp )
        console.log('joined room', chatRequestIDProp)

        setCurrentRoom(chatRequestIDProp)


    }, [])




    // function to send messages
    const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        console.log('sending message', messages, 'in room:', chatRequestIDProp)



        // sending message to backend
        await socket.emit('message', messages)

        socket.on("message-back-to-client", (message: string) => {

            console.log('received message:', message)
            setReceivedMessage(message)
        })




    }





    return (
        <div>
            <p>Current room {currentRoom}</p>
            <form onSubmit={sendMessage} >

                Message: <input 
                  value={messages}
                  onChange={(e) => setMessages(e.target.value)}
                />
                
                <Button type="submit" >Send message</Button>

            </form>

            <div>
                Received message: {receivedMessage}
            </div>
        </div>
    )
}



export default Chatroom











