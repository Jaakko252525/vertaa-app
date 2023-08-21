
// bootstrap
import { Button } from "react-bootstrap"

// gql 
import { EDIT_CHAT_ROOM_REQUEST_STATUS } from "../graphql/queries"


// useMutation
import { useMutation } from "@apollo/client"


// interface 
interface props {
    chatReqIdProp: string
}



const EditUsersChatroomReqStatus = ({ chatReqIdProp }: props) => {



    // mutation
    const [EditReq, { data, loading, error }] = useMutation(EDIT_CHAT_ROOM_REQUEST_STATUS)


    // accept chatroomReq
    const acceptChatRoomReq = async () => {


        await EditReq({ variables: { chatReqId: chatReqIdProp, status: 'accepted' } })
        console.log('accpeted chat req')


    }


    // decline chatroomReq
    const declineChatRoomReq = async () => {

        await EditReq({ variables: { chatReqId: chatReqIdProp, status: 'rejected' } })
        console.log('declined chat req')


    }

    return (
          <div>            
            <Button onClick={acceptChatRoomReq} >Accept</Button>
            <Button onClick={declineChatRoomReq} >Decline</Button>
          </div>
    )
}


export default EditUsersChatroomReqStatus











