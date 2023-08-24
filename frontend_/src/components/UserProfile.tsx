


// bootstrap
import { CardGroup, Card, Button } from "react-bootstrap"

// navigate hook
import { useNavigate } from "react-router-dom"

// useSelector
import { useSelector, useDispatch } from "react-redux"

// redux slicer
import { userToStore } from "../Redux/userSlice"

// components
import AddSaleForm from "./AddSaleForm"
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
            <Button variant="dark" onClick={deleteUserRoute} >Info for deleting user</Button>
        <div>

              <CardGroup className="YourSalesAndCreateSaleCardGroupSize" >
      <Card className="YourSalesAndCreateSale" >
        <Card.Body>
          <Card.Title>Your sales</Card.Title>
          <Card.Text>    
                <div>
                    <UsersSales/>
                </div>          
           </Card.Text>
        </Card.Body>
      </Card>
             </CardGroup>

                </div>

            <br/>
            <br/>

            <div>
                <Button variant="dark" onClick={vertaaRoute} >Vertaa page</Button>
            </div>
            <div>
                <BuyerChatReqs buyerIdProp={user.id} />
            </div>
        </div>
    )
}



export default UserProfile






