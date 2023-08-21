


// bootstrap
import { Button } from "react-bootstrap"

// gql
import { USER_SALES } from "../graphql/queries"

// useQuery
import { useQuery } from "@apollo/client"

// useSelector
import { useSelector } from "react-redux"

// useState
import { useState } from "react"

// components
import EditSale from "./EditSale"
import GetChatroomReqs from "./GetChatroomReqs"

// interface for user
interface interfaceForUser {
    username: string,
    id: string
}


// sale interface
interface saleInterface {
    _id: string
    price: string
    product: string
    user: string
}



const UsersSales =() => {


    // state for sale
    const [sales, setSales] = useState<saleInterface[]>()


    // fetch data from redux user
    // @ts-ignore
    const user: interfaceForUser = useSelector(state => state.user)

    console.log('making query with user:', user)
    // useQuery and useMutation
    const query = useQuery(USER_SALES, {variables: { userSalesId: user.id }})


    // function to use query
    const fetchSales = async () => {

        console.log('here and user:', user.id)


        // making gql query
        const { loading, error, data } = await query

        console.log(data)


        setSales(data.userSales)

    }

    return (
        <div>

                <div>
                    <Button variant="dark" onClick={fetchSales} >Your sales</Button>
                    <div>
                    <ul>
                        {sales?.map(sale => 
                            <li key={sale._id} >
                                Product: {sale.product} Price: {sale.price}
                                <EditSale modifiedSaleIdProp={sale._id} userIdProp={user.id} />
                                <GetChatroomReqs forSaleIdProp={sale._id} />
                            </li>                    
                            )}
                    </ul>
                    </div>
                    <Button variant="dark" onClick={() => setSales([])} >Close</Button>
                </div>

        </div>
    )
}

export default UsersSales





