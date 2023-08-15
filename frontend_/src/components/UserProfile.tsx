




// navigate hook
import { useNavigate } from "react-router-dom"

// useSelector
import { useSelector, useDispatch } from "react-redux"

// redux slicer
import { userToStore } from "../Redux/userSlice"

// components
import AddSaleForm from "./AddSaleForm"
import UsersSales from "./UsersSales"



// component
const UserProfile = () => {

    // @ts-ignore
    const user = useSelector(state => state.user)

    // useDispatch
    const dispatch = useDispatch()
    // navigate
    const navigate = useNavigate()


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

    // vertaa page route
    const vertaaRoute = () => {
        const path = "/vertaaPage"
        navigate(path)
    }



       return (
        <div>
            {user.username} profile

            <button onClick={logout} >Logout</button>

            <br/>
            <br/>
            <button onClick={deleteUserRoute} >Info for deleting user</button>


            <div>
                <UsersSales  />
                <br/>
                <AddSaleForm userIdProp={user.id} />
            </div>

            <br/>
            <br/>

            <div>
                <button onClick={vertaaRoute} >Vertaa page</button>
            </div>
        </div>
    )
}



export default UserProfile






