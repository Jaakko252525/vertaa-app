




// gql
import { GET_BUYERS_CHAT_REQS } from "../graphql/queries"

// useMutation
import { useMutation } from "@apollo/client"

import { useState, useEffect } from "react"

// useDispatch 
import { useDispatch } from "react-redux"

// navigate
import { useNavigate } from "react-router-dom"


// components
import Chatroom from "./Chatroom"
import { Button } from "react-bootstrap"

// redux slicer
import { chatReqIDToStore } from "../Redux/chatReqIdSlice"


interface propss {
    buyerIdProp: string
}


interface chatReqInterface {
    id: string,
    seller: string,
    buyer: string,
    forSale: {
        _id: string,
        product: string,
        price: string,
        userId: string
    }



}

// BuyerChatReqs component
const BuyerChatReqs = ({ buyerIdProp }: propss) => {


    // chats state
    const [chatReqs, setChatReqs] = useState<chatReqInterface[]>([])

    const [arrayOfChatReqObjectsState, setArrayOfChatReqObjectsState] = useState<chatReqInterface[]>()

    // navigate
    const navigate = useNavigate()

    // chat req id array
    //@ts-ignore
    const [chatReqIds, setChatReqIds] = useState([])

    // dispatch
    const dispatch = useDispatch()

    // maiking mutation
    const [getBuyersChatReqs, {data, error, loading}] = useMutation(GET_BUYERS_CHAT_REQS)




    // function to get reqs
    const functionToGetReqs = async () => {


        const result = await getBuyersChatReqs({ variables: { buyerId: buyerIdProp } })

        // making variable 
        const resultInArray = result.data.getBuyersChatroomRequests

        //@ts-ignore
        let arrayOfIDs = []

        
        //@ts-ignore
        let arrayOfChatReqObjects = []

        // Loop through the array and log the IDs
        await chatReqs.forEach(r => {

            arrayOfIDs.push(r.id)
            arrayOfChatReqObjects.push({
                id: r.id,
                buyer: r.buyer,
                seller: r.seller,
                forSale: r.forSale,
            })
        });




        // @ts-ignore
        await setArrayOfChatReqObjectsState(arrayOfChatReqObjects)


        //@ts-ignore
        await setChatReqIds(arrayOfIDs)

        await setChatReqs(resultInArray)


        console.log('function succesful')
    }


    useEffect(() => {

        functionToGetReqs()

    

    }, [])


    // function to go to room
    const goToChatroom = async (id: string, buyerIdd: string) => {


        // object for chatReq redux store
        const obj = {
            id: id,
            buyerId: buyerIdd
        }

        // chatrequest id to redux store
        await dispatch(chatReqIDToStore(obj))

        const path = '/buyersSideChatroom'

        navigate(path)
        return
    }




    if (chatReqs.length > 0) {



        return (
            <div>
                <h1>Your chatroom requests:</h1>
                <br/>
                <Button variant="dark" onClick={() => functionToGetReqs()} >Show your chatRequests</Button>
                <br/>
                <br/>
                <ul>

                    {arrayOfChatReqObjectsState && arrayOfChatReqObjectsState.map((r: chatReqInterface ) => (
                        <li key={r.id}>
                            Buyer ID: {r.buyer} <br/>
                            Seller ID: {r.seller} <br/>
                            Product: {r.forSale.product} <br/>
                            Price: {r.forSale.price} <br/>
                            <button onClick={() => goToChatroom(r.id, r.buyer)} >Go to chatroom</button>
                            <br/>
                            <br/>
                        </li>
                    ))}
                </ul>
            </div>


    )}

    return (
        <div>

        </div>

    )

}


export default BuyerChatReqs



















