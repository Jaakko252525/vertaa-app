
import { useMutation } from "@apollo/client"

// importing login query
import { LOGIN_MUTATION, LOGIN } from "../graphql/queries"

// importing useState
import { useState } from "react"




// Login component
const Login = () => {

    // states for username and password
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    /// useMutation
    const [Login, {data, loading, error}] = useMutation(LOGIN)

    // submit function
    const submit = async (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        // using mutation
        console.log('wut here?', await Login({ variables: {username: username, password: password} }))
        
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










