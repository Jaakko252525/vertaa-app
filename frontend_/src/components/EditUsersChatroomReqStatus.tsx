
// bootstrap
import { Button } from "react-bootstrap"

// useNavigate
import { useNavigate } from "react-router-dom"

// gql 
import { EDIT_CHAT_ROOM_REQUEST_STATUS } from "../graphql/queries"

import { useState } from "react"


// useMutation
import { useMutation } from "@apollo/client"


// components imported
import Chatroom from "./Chatroom"


// interface 
interface props {
    chatReqIdProp: string
}



const EditUsersChatroomReqStatus = ({ chatReqIdProp }: props) => {

    const [goToChatroom, setGoToChatroom] = useState(false)

    // mutation
    const [EditReq, { data, loading, error }] = useMutation(EDIT_CHAT_ROOM_REQUEST_STATUS)


    // accept chatroomReq
    const acceptChatRoomReq = async () => {

        console.log('id', chatReqIdProp)

        
        await EditReq({ variables: { chatReqId: chatReqIdProp, status: 'accepted' } })

        console.log('here??')

        await setGoToChatroom(true)


        // navigagte to path



    }


    // decline chatroomReq
    const declineChatRoomReq = async () => {
        
        await EditReq({ variables: { chatReqId: chatReqIdProp, status: 'rejected' } })
        


    }

    if (goToChatroom === true) {



        return (
            <div>
             <Chatroom chatRequestIDProp={String(chatReqIdProp)} />

            </div>
        )
    }


    return (
          <div>
            ChatroomRequest 
            <br/>            
            <Button onClick={acceptChatRoomReq} >Accept</Button>
            <br/>
            <Button onClick={declineChatRoomReq} >Decline</Button>
            <br/>
            <br/>
            </div>
    )
}


export default EditUsersChatroomReqStatus











