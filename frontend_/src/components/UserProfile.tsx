




// navigate hook
import { useNavigate } from "react-router-dom"



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



        </div>
    )
}



export default UserProfile






