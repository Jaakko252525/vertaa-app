




// importing GQL
import { CREATECHATROOMREQUEST } from "../graphql/queries"


// useMutation
import { useMutation } from "@apollo/client"

// state
import { useState } from "react"


const ChatRequestButton = () => {

    // states
    const [seller, setSeller] = useState('')
    const [buyer, setBuyer] = useState('')
    const [saleId, setSaleId] = useState('')
    const [status, setStatus] = useState('pending')

    // mutation
    const [createChatRoomRequest, { data, error, loading }] = useMutation(CREATECHATROOMREQUEST)



    
    // function that uses the mutation

    return (
        <div>
            hello
        </div>
    )





}




export default ChatRequestButton


