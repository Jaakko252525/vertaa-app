

// bootstrap
import { Button, Card, CardGroup } from "react-bootstrap";

// useSelector
import { useSelector, useDispatch } from "react-redux";

// css
import '../cssFiles/TopBar.css'

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

            <Card className="cards-style" >

                <Card.Body className='cardBodyTopBarr' >
                <div className='button-containerr' >
                    <button className='text-buttonn' onClick={frontpageRoute} >Frontpage</button>
                    <button className='text-buttonn' onClick={userProfileRoute} >Profile</button>
                    <button className='text-buttonn' onClick={vertaaRoute} >Vertaa</button>
                    <button className='text-buttonn' onClick={addSaleROute} >Create sale</button>
                    <button className="text-buttonn" onClick={() => logout()}>Logout</button>
                    <button className='text-buttonn' onClick={addSaleROute} >Create sale</button>
                    <button className="text-buttonn" onClick={() => logout()}>Logout</button>



                </div>
                </Card.Body>

            </Card>



        </div>
    )
    }





export default TopBar












