







// useSelector
import { useSelector, useDispatch } from "react-redux"

// redux slicer
import { userToStore } from "../Redux/userSlice"

/*
// graphql query
import { userSales } from "../graphql/queries"
*/

interface interfaceForUser {
    username: string,
    id: string
}

const UserProfile = () => {

    // @ts-ignore
    const user: interfaceForUser =  useSelector(state => state.user)

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

    return (
        <div>
            {user.username} profile

            <button onClick={logout} >Logout</button>



        </div>
    )
}



export default UserProfile






