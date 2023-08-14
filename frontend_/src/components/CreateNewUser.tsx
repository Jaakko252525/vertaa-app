
// bootstrap
import { Button } from "react-bootstrap"

// use navigation
import { useNavigate } from "react-router-dom"

// importing mutation variable
import { CREATE_USER } from "../graphql/queries"

// useMutation
import { useMutation } from "@apollo/client"

// useState
import { useState } from "react"

const CreateNewUser = () => {

    // username and password states
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    // navigation
    const navigate = useNavigate()

    // using useMutation
    const [create_user, { data, loading, error }] = useMutation(CREATE_USER)


    // function that handles form submit
    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()


        // calling create_user mutation
        await create_user({ variables: { username: username, password: password } })

    }


    // navigate to login route

    const loginRoute = () => {
        const path = '/login'
        navigate(path)
    }



    return (

        <div style= {{
            textAlign: "center"
        }}>
            <p className="pageText" >Create user</p>
            <form className="form" onSubmit={submit} > 

                Username: <input
                            value={username}
                            onChange={value => setUsername(value.target.value)}>
                          </input>
                Password: <input 
                            value={password}
                            onChange={sss => setPassword(sss.target.value) }>
                          </input>
              <Button variant='dark' size='sm'  type="submit">Create user</Button>            </form>
            <br/>
            <br/>
            <div>
                <Button onClick={loginRoute} variant='dark'  >Login</Button>
            </div>
        </div>
    )
}

export default CreateNewUser




