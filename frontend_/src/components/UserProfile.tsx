




// navigate hook
import { useNavigate } from "react-router-dom"

// useSelector
import { useSelector, useDispatch } from "react-redux"

// redux slicer
import { userToStore } from "../Redux/userSlice"

// useQuery
import { useQuery } from "@apollo/client"

// gql
import { USER_SALES } from "../graphql/queries"

// useState
import { useState } from "react"

// interface for user
interface interfaceForUser {
    username: string,
    id: string
}

// sale interface
interface saleInterface {
    id: string
    price: string
    product: string
    user: string
}

const UserProfile = () => {


    // state for sale
    const [sales, setSales] = useState<saleInterface[]>()


    // @ts-ignore
    const user: interfaceForUser =  useSelector(state => state.user)

    const query = useQuery(USER_SALES, {variables: { userSalesId: user.id }})

    const func = async () => {

        // making gql query
        const { loading, error, data } = await query

        // sales to state
        setSales(data)

        console.log('sales', sales)
        
    }


    func()
 

    // calling create_user mutation
    //user_sales({ variables: { userSalesId: user.id } })    

    //console.log('sales', user_sales)

    // navigate
    const navigate = useNavigate()

    // useDispatch
    const dispatch = useDispatch()


    // logout function
    const logout = () => {

        const userObject = {
            username: ''
        }

        // user to 
        dispatch(userToStore(userObject))
    }


    // deleteUser route
    const deleteUserRoute = () => {
        const path = "/deleteUser"
        navigate(path)

    }

    


    return (
        <div>
            {user.username} profile

            <button onClick={logout} >Logout</button>

            <br/>
            <br/>
            <button onClick={deleteUserRoute} >Info for deleting user</button>

            <div> sales query toimii mutta datasciensiä tarvii</div>



        </div>
    )
}



export default UserProfile






