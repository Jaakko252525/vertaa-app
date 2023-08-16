









// bootstrap
import { Button } from "react-bootstrap"

// importing useState
import { useEffect, useState } from "react"



import { getAllSales } from "../graphql/queries"


// redux hooks
import { useSelector, useDispatch } from 'react-redux'



// redux actions
import { userToStore } from "../Redux/userSlice"

// components
import SaleSearch from "./SaleSearch"
import e from "express"

// interface
interface dataInterface {
    product: string
    price: string
    _id: string
}

// redux state interface
interface reduxState {
    user: Object
}

interface interfaceForUser {
    _id: string,
    username: string,
    password: string,
    forSale: Object

}

// Frontpage component
const Frontpage = () => {
    // state for sales
    const [sales, setSales] = useState<dataInterface[]>()

    // state for searchWord
    const [searchWord, setSearchWord] = useState('')
    const [renderSearch, setRenderSearch] = useState(false)



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



    // submit function. changes render state to true
    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        console.log('submitted')
        console.log('search word', searchWord)
        
        setRenderSearch(true)
    }


    // if state === true render SaleSearch component
    if (renderSearch === true) {
        return (
            <div>
              <div>
                <form className="form" onSubmit={submit} >
                    Search sales <input
                    value={searchWord}
                    onChange={(e) => setSearchWord(e.target.value)}                    

                    />
                    <Button type="submit" >Search</Button>
                
                </form>
                </div>
                
                <SaleSearch searchWordProp={searchWord} />
            </div>
        )
    }else if (sales !== undefined) {
        return (
            <div>
               <div>
                <p style={
                    {
                       textAlign: 'center',
                       position: 'relative',
                       top: '15px'
                    }
                } >Frontpage</p>
                </div>
                <div>
                <form className="form" onSubmit={submit} >
                    Search sales <input
                    value={searchWord}
                    onChange={e => setSearchWord(e.target.value)}                    

                    />
                    <Button type="submit" >Search</Button>
                
                </form>
                </div>
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


