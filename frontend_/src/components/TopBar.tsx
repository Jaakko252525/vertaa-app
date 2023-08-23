

// bootstrap
import { Button, Card, CardGroup } from "react-bootstrap";

// useSelector
import { useSelector, useDispatch } from "react-redux";



// useNavigate
import { useNavigate } from "react-router-dom";


// useState
import { useState } from "react";
import { userToStore } from "../Redux/userSlice";

// interface for redux store
interface reduxStore {
    user: {
        id: string,
        username: string,
        password: string
    }
}

// TopBar component
const TopBar = () => {


    // logged in user
    const user = useSelector((state: reduxStore) => state.user)

    const dispatch = useDispatch()



    // navigate
    const navigate = useNavigate()

    // Navigate
    const frontpageRoute = () => {
        const path = `/frontpage`;
        navigate(path)
    }

    // userProfile route
    const userProfileRoute = () => {
        const path = "/userProfile"
        navigate(path)
    }

    // create new user route
    const createNewUserRoute = () => {
        const path = "/createNewUser"
        navigate(path)
    }

    // vertaaRoute 
    const vertaaRoute = () => {
        const path = "/vertaapage"
        navigate(path)
    }

    // addSaleROute 
    const addSaleROute = () => {
        const path = "/addSale"
        navigate(path)
    }

    // logout function
    const logout = async () => {

        const userObject = {
            username: ''
        }
        // using slicer
        await dispatch(userToStore(userObject))

        // navigate to login
        const path = "/login"
        navigate(path)

        return
    }




    return (
        <div>

            <Card className='topBarLogin' >

                <Card.Body className='cardBodyTopBar' >
                <div className='button-container' >
                    <button className='text-button' onClick={frontpageRoute} >Frontpage</button>
                    <button className='text-button' onClick={userProfileRoute} >Profile</button>
                    <button className='text-button' onClick={vertaaRoute} >Vertaa</button>
                    <button className='text-button' onClick={addSaleROute} >Create sale</button>
                    <button className="text-button" onClick={() => logout()}>Logout</button>



                </div>
                </Card.Body>

            </Card>



        </div>
    )
    }





export default TopBar












