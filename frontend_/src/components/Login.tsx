








// bootstrap
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

// css
import 'bootstrap/dist/css/bootstrap.min.css';



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
import { sign } from 'crypto';

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




    // if logged in then render other pages
   if (userVar.username !== '') {
    return (
        <div style={{
            textAlign: 'center'

        }} >
            <p className='pageText' > Welcome: {userVar.username}</p> <br/>
            <br/>

            <ButtonGroup size="lg" className="mb-2">
                <Button variant='dark' onClick={() => logout()} >Logout</Button>
                <Button variant='dark' onClick={frontpageRoute} >Frontpage</Button>
                <Button variant='dark' onClick={userProfileRoute}>Profile</Button>
            </ButtonGroup>           

        </div>
    )
   }

    return (
        <div style={{
            textAlign: "center"
        }} >

            <p className='pageText' >Login page</p>
            <br/>

            <form className='form'  onSubmit={submit}>
                
                Username: <input 
                value={username}
                onChange={event => setUsername(event.target.value)}
                />

                Password: <input
                value={password}
                onChange={event => setPassword(event.target.value)}
                  />
            
                
              <Button variant='dark' size='sm'  type="submit">Submit</Button>


            </form>

            <br/>
            <br/>
            <div className='form' >
                <Button onClick={createNewUserRoute} variant='dark'  >Create user</Button>
            </div>

        </div>
    )
}



export default Login










