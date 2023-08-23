
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


// dispatch
import { useDispatch } from "react-redux"

// redux slicer
import { chatReqIDToStore } from "../Redux/chatReqIdSlice"

// interface 
interface props {
    chatReqIdProp: string
}



const EditUsersChatroomReqStatus = ({ chatReqIdProp }: props) => {

    const [goToChatroom, setGoToChatroom] = useState(false)

    // mutation
    const [EditReq, { data, loading, error }] = useMutation(EDIT_CHAT_ROOM_REQUEST_STATUS)

    // dispatch
    const dispatch = useDispatch()

    // navigate
    const navigate = useNavigate()

    // accept chatroomReq
    const acceptChatRoomReq = async () => {

        console.log('id', chatReqIdProp)

        
        await EditReq({ variables: { chatReqId: chatReqIdProp, status: 'accepted' } })

        console.log('here??')

        await setGoToChatroom(true)

        console.log('here 1')
        // chatrequest id to redux store
        await dispatch(chatReqIDToStore(chatReqIdProp))
        console.log('here 2')


        // navigagte to path
        const path = '/chatRoom'
        await navigate(path)
        console.log('here 3')



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











