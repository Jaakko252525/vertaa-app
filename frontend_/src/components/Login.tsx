















import { useMutation } from "@apollo/client"

// importing login query
import { LOGIN } from "../graphql/queries"

// importing useState
import { useState } from "react"

// importing react redux hooks
import { useSelector, useDispatch } from "react-redux"

// importing slicer
import userSlice from "../Redux/userSlice"

import { userToStore } from "../Redux/userSlice"

interface userObjetInterface {
    username: string
}


// Login component
const Login = () => {

    // states for username and password
    const [username, setUsername] = useState('Jaakko')
    const [password, setPassword] = useState('123')

    // useSelector and useDispatch
    // @ts-ignore
    const userVar = useSelector(state => state.user)
    const dispatch = useDispatch()


    /// useMutation
    const [Login, {data, loading, error}] = useMutation<userObjetInterface>(LOGIN)


    // submit function
    const submit = async (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()


        console.log('user before', userVar.username )
        // using mutation
        const login = await Login({ variables: {username: username, password: password} })
        


       

        // setting user to state
        // @ts-ignore comment
        if (login.data.login.username !== null) {


            //making userObject
            const userObject: userObjetInterface = {
                // @ts-ignore comment
                username: login.data.login.username
            }

            console.log('user:', userObject.username)

            // using slicer
            await dispatch(userToStore(userObject))
            
        }
    }

    // logout function
    const logout = async () => {

        console.log(' inner')
        const userObject = {
            username: ''
        }
        // using slicer
        await dispatch(userToStore(userObject))

        return
    }

    
   if (userVar.username !== '') {
    return (
        <div >
            Succesfully logged in with user: {userVar.username} <br/>
            <button onClick={() => logout()}>Logout</button>
        </div>
    )
   }

    return (
        <div>
            <h1>Login page</h1>
            <form onSubmit={submit}>
                Username: <input 
                value={username}
                onChange={event => setUsername(event.target.value)}
                />

                Password: <input
                value={password}
                onChange={event => setPassword(event.target.value)}
                  />
                
              <button type="submit">Submit</button>


            </form>

        </div>
    )
}



export default Login










