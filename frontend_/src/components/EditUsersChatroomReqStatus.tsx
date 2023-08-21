
// bootstrap
import { Button } from "react-bootstrap"


// gql 
import { EDIT_CHAT_ROOM_REQUEST_STATUS } from "../graphql/queries"


// useMutation
import { useMutation } from "@apollo/client"


// interface 
interface props {
    chatReqIdProp: number
}



const EditUsersChatroomReqStatus = ({ chatReqIdProp }: props) => {



    // mutation
    const [EditReq, { data, loading, error }] = useMutation(EDIT_CHAT_ROOM_REQUEST_STATUS)


    // accept chatroomReq
    const acceptChatRoomReq = async () => {

        
        await EditReq({ variables: { chatReqId: chatReqIdProp.toString(), status: 'accepted' } })
        
        console.log('accpeted chat req')


    }


    // decline chatroomReq
    const declineChatRoomReq = async () => {
        
        await EditReq({ variables: { chatReqId: chatReqIdProp, status: 'rejected' } })
        
        console.log('declined chat req')


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











