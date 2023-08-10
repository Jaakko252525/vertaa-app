







// useSelector
import { useSelector } from "react-redux"


// useMutation
import { useMutation } from "@apollo/client"


import { DELETE_USER } from "../graphql/queries"

const DeleteUser = () => {

    // current user
    // @ts-ignore
    const user = useSelector(state => state.user)


    // making mutation
    const [delete_user, { data, loading, error }] = useMutation(DELETE_USER)

    // delete function that uses graphql mutation
    const deleteFunction = async () => {

        console.log('username', user.username)
        console.log('password', user.password)
        // calling create_user mutation
        await delete_user({ variables: { username: user.username, password: user.password } })
    }

    console.log('user', user)

    return (


        <div>
            <button onClick={deleteFunction} >Delete user permanently</button>
        </div>
    )
}



// eporting component
export default DeleteUser


