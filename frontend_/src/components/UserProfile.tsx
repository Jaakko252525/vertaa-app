




// useSelector
import { useSelector } from "react-redux"


const UserProfile = () => {

    // @ts-ignore
    const user = useSelector(state => state.user)


    // get users ForSales



    return (
        <div>
            User profile: {user.username}
        </div>
    )
}



export default UserProfile






