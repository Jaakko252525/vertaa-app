
import { useMutation } from "@apollo/client"

// importing login query
import { LOGIN_MUTATION, LOGIN } from "../graphql/queries"

// importing useState
import { useState } from "react"


interface userObjetInterface {
    username: string
}

// Login component
const Login = () => {

    // states for username and password
    const [username, setUsername] = useState('Jaakko')
    const [password, setPassword] = useState('123')

    // user state
    const [user, setUser] = useState()

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
            const userObject = {
                // @ts-ignore comment
                username: login.data.login.username
            }
            // @ts-ignore comment
            setUser(userObject)

        }
    }

    
   if (user !== undefined) {
    return (
        <div>
            siuu
            <button onClick={() => setUser(undefined)}>Logout</button>
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










