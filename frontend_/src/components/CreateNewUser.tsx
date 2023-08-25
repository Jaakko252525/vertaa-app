


// css
import '../cssFiles/CreateNewUser.css'


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

        <div>
            <div>
            <p className='pageTextt' >Create user</p>
            </div>

            <div>
                <form className="form" onSubmit={submit} > 

                        Username: <input
                                    value={username}
                                    onChange={value => setUsername(value.target.value)}>
                                </input>
                        Password: <input 
                                    value={password}
                                    onChange={sss => setPassword(sss.target.value) }>
                                </input>
                    <button type="submit">Create user</button>            
                </form>
            </div>
            <br/>
            <br/>
            <div>
                <button onClick={loginRoute}>Login</button>
            </div>
        </div>
    )
}

export default CreateNewUser




