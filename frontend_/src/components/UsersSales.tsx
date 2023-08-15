


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

    // useQuery and useMutation
    const query = useQuery(USER_SALES, {variables: { userSalesId: user.id }})

    const fetchSales = async () => {


        // making gql query
        const { loading, error, data } = await query


        setSales(data.userSales)

    }

    return (
        <div>

                <div>
                    <Button variant="dark" onClick={fetchSales} >Your sales</Button>

                    <ul>
                        {sales?.map(sale => 
                            <li key={sale._id} >
                                Product: {sale.product} Price: {sale.price}
                                <EditSale modifiedSaleIdProp={sale._id} userIdProp={user.id} />
                            </li>                    
                            )}
                    </ul>
                    <Button variant="dark" onClick={() => setSales([])} >Close</Button>
                </div>

        </div>
    )
}

export default UsersSales





