


// bootstrap
import { CardGroup, Card, Button } from "react-bootstrap"

// navigate hook
import { useNavigate } from "react-router-dom"

// useSelector
import { useSelector, useDispatch } from "react-redux"

// redux slicer
import { userToStore } from "../Redux/userSlice"

// css
import '../cssFiles/UserProfile.css'


// components
import UsersSales from "./UsersSales"
import BuyerChatReqs from "./BuyersChatReqs"
import TopBar from "./TopBar"


interface reduxStore {
    user: {
        id: string,
        username: string,
        password: string
    }
}

// component
const UserProfile = () => {


    const user = useSelector((state: reduxStore) => state.user)

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
            <div>
                <TopBar/>
            </div>
            <div style={
                {
                    textAlign: 'center',
                    position: 'relative',
                    top: '15px'
                }
            } >
            {user.username} profile
            </div>


            <Button variant="dark" onClick={logout} >Logout</Button>

            <br/>
            <br/>
        <div>

            <CardGroup  >
                <Card >
                    <Card.Body>
                    <Card.Title>Your sales</Card.Title>
                    <Card.Text>    
                            <div>
                                <UsersSales/>
                            </div>          
                    </Card.Text>
                    </Card.Body>
                </Card>

                <Card className="YourSalesAndCreateSale" >
                    <Card.Body>
                    <Card.Text>    
                            <div>
                            <BuyerChatReqs buyerIdProp={user.id} />
                            </div>          
                    </Card.Text>
                    </Card.Body>
                </Card>
             </CardGroup>

                </div>
        </div>
    )
}



export default UserProfile






