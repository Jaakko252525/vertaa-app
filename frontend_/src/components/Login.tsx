




// importing useState
import { useState } from "react"

// Login component
const Login = () => {

    // states for username and password
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    // submit function
    const submit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        console.log('form submitted!')
        
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










