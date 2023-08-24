

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


interface idAndBuyerIDObj {
    id: string,
    buyerId: string
}



// component
const GetChatroomReqs = ({ forSaleIdProp }: (propsInterface)) => {

    // chats state
    const [chatReqs, setChatReqs] = useState([])

    // array of id in chatreq
    const [chatReqIdArray, setChatReqIdArray] = useState([])


    // making the mutation variable
    const [get_chatroom_reqs, {data, error, loading}] = useMutation(GET_CHATROOM_REQUESTS)


    const getAllChatReqs = async () => {

        if (forSaleIdProp !== null){
        const result = await get_chatroom_reqs({ variables: { forSaleId: forSaleIdProp } })
        const reqsInArray = await result.data.getChatRoomRequests



        //@ts-ignore
        let idArray = []

        //@ts-ignore
        await reqsInArray.forEach(r => {
            idArray.push(
                {
                    id: r.id,
                    buyerId: r.buyer
                }
            )
        })


      

        //@ts-ignore
        await setChatReqIdArray(idArray)
        await setChatReqs(reqsInArray)
        }






    }




    useEffect(() => {

        getAllChatReqs()

    

    }, [])

    if (chatReqs.length > 0) {

        console.log('chatreqs', chatReqs)


        return (
            <div>
                <ul>
                    {chatReqs.map((r: idAndBuyerIDObj) => 
                        <li key={r.id} >
                            
                            <EditUsersChatroomReqStatus chatReqIdProp={r.id} buyerIdProp={r.buyerId} />
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

















