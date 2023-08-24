








// bootstrap
import Button from 'react-bootstrap/Button';
import { CardGroup, Card } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

// css
import 'bootstrap/dist/css/bootstrap.min.css';

import '../Login.css'


import { useMutation } from "@apollo/client"

// importing login query
import { LOGIN } from "../graphql/queries"

// importing useState
import { useState } from "react"

// navigate hook
import { useNavigate } from "react-router-dom"


// importing react redux hooks
import { useSelector, useDispatch } from "react-redux"


import { userToStore } from "../Redux/userSlice"

// components
import TopBar from './TopBar';

interface userObjetInterface {
    username: string,
    id: string | undefined
}



// Login component
const Login = () => {

    // states for username and password
    const [username, setUsername] = useState('koodari_matti')
    const [password, setPassword] = useState('123')

    // navigation hook to a variable
    const navigate = useNavigate()

    // useSelector and useDispatch
    // @ts-ignore
    const userVar = useSelector(state => state.user)
    const dispatch = useDispatch()


    /// useMutation
    const [Login, {data, loading, error}] = useMutation<userObjetInterface>(LOGIN)


    // submit function
    const submit = async (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        // using mutation
        const login = await Login({ variables: {username: username, password: password} })
        


        // setting user to state
        // @ts-ignore comment
        if (login.data.login.username !== null) {
            
            //making userObject
            const userObject: userObjetInterface = {
                // @ts-ignore comment
                username: login.data.login.username,
                //@ts-ignore
                id: login.data.login.id,
                //@ts-ignore
                password: login.data.login.password
            }

            console.log('user', userObject)


            // using slicer
            await dispatch(userToStore(userObject))


            
        }
    }

    // logout function
    const logout = async () => {

        const userObject = {
            username: ''
        }
        // using slicer
        await dispatch(userToStore(userObject))

        return
    }


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





    // if logged in then render other pages
   if (userVar.username !== '') {
    return (
        <div>
            <TopBar/>

            <div style={{
                textAlign: "center"
            }} >
                <button onClick={userProfileRoute} className='pageTextLogin' > Welcome: {userVar.username}</button>
            </div>

        </div>
    )
   }

    return (
        <div>            

            <p className='pageTextLogin' >Login page</p>
            <br/>

            <Card  className='LoginCard' >
            <Card.Body className='LoginCardBody' >
                        <form className='form-container'  onSubmit={submit}>
                        <div className="input-group">
                            <label>Username:</label> 
                            <input 
                                className='inputStyling' 
                                value={username}
                                onChange={event => setUsername(event.target.value)}
                            />
                            <br/>
                            </div>
                            <div className="input-group">
                            <label>Password:   </label>
                            <input 
                                className='inputStyling'
                                value={password}
                                onChange={event => setPassword(event.target.value)}
                            />
                            </div> 
                        
                            
                        <button className='submitButton'  type="submit">Submit</button>


                        </form>
            </Card.Body>
            </Card>

            <br/>
            <div style={
                {
                    textAlign: "center"
                }
            } >
                <p>or</p>
                <button className='createUserButtonnn' onClick={createNewUserRoute}  >Create user</button>
            </div>
            <br/>
            <br/>


 
        </div>
    )
}



export default Login










