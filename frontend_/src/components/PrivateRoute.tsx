


// importing redux things
import { useSelector } from "react-redux";

// Navigate
import { Navigate } from 'react-router-dom';

// @ts-ignore
const PrivateRoute = ({ childrenProp }) => {

    // redux store to check if user logged in
    //@ts-ignore
    const user = useSelector(state => state.user.username)
    console.log('user', user)
    
    if (!user) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/login"  />
    }

    // authorized so return child components
    return childrenProp;
}


// exporting component

export default PrivateRoute













