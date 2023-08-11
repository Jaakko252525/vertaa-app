











// importing useState
import { useEffect, useState } from "react"



import { getAllSales } from "../graphql/queries"


// redux hooks
import { useSelector, useDispatch } from 'react-redux'



// redux actions
import { userToStore } from "../Redux/userSlice"

// interface
interface dataInterface {
    product: string
    price: string
    _id: string
}

// Frontpage component
const Frontpage = () => {
    // state for sales
    const [sales, setSales] = useState<dataInterface[]>()

    // redux store
    const dispatch = useDispatch()

    const getData = async () => {

        // use query
        const data = await getAllSales()

        setSales(data.allSales)

    }

    // logout function
    const logout = () => {

        const userObject = {
            username: ''
        }

        // user to 
        dispatch(userToStore(userObject))
    }


    useEffect(() => {

        getData()


    },[])

    // if sales not empty
    if (sales !== undefined) {
        return (
            <div>
                <h1>Frontpage</h1>
                <ul>
                    {sales.map(s => 
                        <li key={s._id} >
                            Product name: {s.product} <br/>
                            Price: {s.price} <br/>
                            ID: {s._id}
                            <br/>
                            <br/>
                        </li>)}
                        
                </ul>

                <div>
                    <button onClick={logout} >Logout</button>
                </div>
            </div>
        )
    }

    return (

        <div>
            hello frontpage
            
        </div>
    )
}




export default Frontpage


