

// bootstrap
import { Card } from 'react-bootstrap'

// connecting to socket io server
import { io } from 'socket.io-client'

// state
import { useState, useEffect } from 'react'



// socket io connection
//@ts-ignore
const socket = io.connect("http://localhost:3003")



const MessageRoom = () => {

    // state
    const [message, setMessage] = useState('')
    const [messageFromBE, setMessageFromBE] = useState('')


    // submit message function
    const submitFormMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // sending message to backend with socket io
        await socket.emit('message-event', message)


    }

    // useEffect
    useEffect(() => {

        // getting message from backend
        socket.on('receive-message', (message: string) => {
            setMessageFromBE(message)
        })


    },[socket])


    return (

        <div>

            <form onSubmit={submitFormMessage} >
                <input  
                value={message}
                onChange={e => setMessage(e.target.value)}

                />

                <button type='submit' >Send</button>
            </form>
            <div>
                {messageFromBE}
            </div>

            <div>
                <Card>


                </Card>
            </div>

        </div>


    )
}


export default MessageRoom














