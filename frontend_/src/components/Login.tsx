











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


        console.log('user before', userVar.username )
        // using mutation
        const login = await Login({ variables: {username: username, password: password} })
        

       console.log('login', login)

        // setting user to state
        // @ts-ignore comment
        if (login.data.login.username !== null) {
            
            console.log('here')
            //making userObject
            const userObject: userObjetInterface = {
                // @ts-ignore comment
                username: login.data.login.username,
                //@ts-ignore
                id: login.data.login.id,
                //@ts-ignore
                password: login.data.login.password
            }
            console.log('here2')

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
        <div >
            Succesfully logged in with user: {userVar.username} <br/>
            <button onClick={() => logout()}>Logout</button>
            <button onClick={frontpageRoute} >Frontpage</button>
            <button onClick={userProfileRoute} >Profile</button>

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
            <br/>
            <br/>
            <div>
                <button onClick={createNewUserRoute} >Create user</button>
            </div>

        </div>
    )
}



export default Login










