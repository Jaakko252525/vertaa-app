


// css
import '../cssFiles/CreateNewUser.css'

// dispatch
import { useDispatch } from 'react-redux'
// redux slicer
import { userToStore } from '../Redux/userSlice'

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

    // dispatch
    const dispatch = useDispatch()

    // using useMutation
    const [create_user, { data, loading, error }] = useMutation(CREATE_USER)


    // function that handles form submit
    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()


        // calling create_user mutation
        await create_user({ variables: { username: username, password: password } })

        // making user object
        const obj = {
            username,
            password
        }

        // user object to redux store
        await dispatch(userToStore(obj))

        // changing page
        await navigate('/login')
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
            <div className='loginButton' >
                <p>or</p>
                <button onClick={loginRoute}>Login</button>
            </div>
        </div>
    )
}

export default CreateNewUser




