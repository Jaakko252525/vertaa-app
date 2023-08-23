




// gql
import { GET_BUYERS_CHAT_REQS } from "../graphql/queries"

// useMutation
import { useMutation } from "@apollo/client"

import { useState, useEffect } from "react"


// components
import Chatroom from "./Chatroom"


interface propss {
    buyerIdProp: string
}


interface chatReqInterface {
    id: string,
    seller: string,
    buyer: string,
    forSale: {
        id: string,
        product: string,
        price: string,
        userId: string
    }



}

// BuyerChatReqs component
const BuyerChatReqs = ({ buyerIdProp }: propss) => {


    // chats state
    const [chatReqs, setChatReqs] = useState<chatReqInterface[]>([])

    // chat req id array
    //@ts-ignore
    const [chatReqIds, setChatReqIds] = useState([])

    // maiking mutation
    const [getBuyersChatReqs, {data, error, loading}] = useMutation(GET_BUYERS_CHAT_REQS)




    // function to get reqs
    const functionToGetReqs = async () => {


        const result = await getBuyersChatReqs({ variables: { buyerId: buyerIdProp } })

        // making variable 
        const resultInArray = result.data.getBuyersChatroomRequests

        console.log('fetched buyer reqs', resultInArray)

        //@ts-ignore
        let arrayOfIDs = []

        // Loop through the array and log the IDs
        await chatReqs.forEach(request => {

            arrayOfIDs.push(request.id)
        });
        
        //@ts-ignore
        await setChatReqIds(arrayOfIDs)

        await setChatReqs(resultInArray)
    }


    useEffect(() => {

        functionToGetReqs()

    

    }, [chatReqs])

    if (chatReqs.length > 0) {




        return (
            <div>
                Chatroom req ID:
                <ul>
                    {chatReqIds.map((id: string, index: number) => (
                        <li key={index}>
                            {id}
                            <Chatroom chatRequestIDProp={id} />
                            <br/>
                            <br/>
                        </li>
                    ))}
                </ul>
            </div>


    )}

    return (
        <div>
            ssss
        </div>

    )

}


export default BuyerChatReqs



















