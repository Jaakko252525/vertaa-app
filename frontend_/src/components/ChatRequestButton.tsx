


// bootstrap
import { Button } from "react-bootstrap"

// importing GQL
import { CREATECHATROOMREQUEST } from "../graphql/queries"


// useMutation
import { useMutation } from "@apollo/client"

// state
import { useState, useEffect } from "react"

// redux
import { useSelector } from "react-redux"


// interface for props
interface Request {
    sellerProp: string,
    saleIdProp: string
}

interface reduxStore {
    user: {
        username: string,
        id: string,
        password: string
    }
}

// ChatRequest component
const ChatRequestButton = ({ sellerProp, saleIdProp }: Request) => {

    // states
    const [seller, setSeller] = useState(sellerProp)
    // buyer from redux store
    const [buyer, setBuyer] = useState('')
    const [saleId, setSaleId] = useState(saleIdProp)
    const [status, setStatus] = useState('pending')


    // getting user
    const user = useSelector((state: reduxStore ) => state.user)
    // user to state


    // mutation
    const [createChatRoomRequest, { data, error, loading }] = useMutation(CREATECHATROOMREQUEST)




    // function that uses the mutation
    const mutationFunction = async () => {



        await createChatRoomRequest({ variables: { seller:seller, buyer: buyer, saleId: saleId, status: status } })
        console.log('chat room request sent succesfully☺')
        




    }

    useEffect(() => {

        setBuyer(user.id)


    },[user])


    return (
        <div>
            <Button onClick={mutationFunction} >Message seller</Button>
            
        </div>
    )





}




export default ChatRequestButton


