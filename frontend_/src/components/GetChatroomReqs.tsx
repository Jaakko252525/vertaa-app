

// useMutation
import { useMutation } from "@apollo/client"

// gql mutation
import { GET_CHATROOM_REQUESTS } from "../graphql/queries"

// state and useEffect
import { useState, useEffect } from "react"

// components
import EditUsersChatroomReqStatus from "./EditUsersChatroomReqStatus"

// interface for props
interface propsInterface {
    forSaleIdProp: string
}




// component
const GetChatroomReqs = ({ forSaleIdProp }: (propsInterface)) => {

    // chats state
    const [chatReqs, setChatReqs] = useState([])


    // making the mutation variable
    const [get_chatroom_reqs, {data, error, loading}] = useMutation(GET_CHATROOM_REQUESTS)


    const getAllChatReqs = async () => {

        const result = await get_chatroom_reqs({ variables: { forSaleId: forSaleIdProp } })
        const reqsInArray = result.data.getChatRoomRequests

      

        setChatReqs(reqsInArray)
    






    }




    useEffect(() => {

        getAllChatReqs()
    

    }, [])

    if (chatReqs.length > 0) {



        return (
            <div>
                <ul>
                    {chatReqs.map((chatReq: { id: number }) => 
                        <li key={chatReq.id} >
                            
                            <EditUsersChatroomReqStatus chatReqIdProp={chatReq.id} />
                        </li>)}
                </ul>
            </div>
        )
    }

    return (
        <div>
            ssss
        </div>

    )
}


export default GetChatroomReqs

















