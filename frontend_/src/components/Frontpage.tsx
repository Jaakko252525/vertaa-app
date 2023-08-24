







// useNavigation
import { useNavigate } from "react-router-dom"

// bootstrap
import { Button, Card } from "react-bootstrap"

// importing useState
import { useEffect, useState } from "react"



import { getAllSales } from "../graphql/queries"


// redux hooks
import { useSelector, useDispatch } from 'react-redux'



// redux actions
import { userToStore } from "../Redux/userSlice"

// components
import SaleSearch from "./SaleSearch"
import ChatRequestButton from "./ChatRequestButton"

// interface
interface dataInterface {
    product: string
    price: string
    _id: string
    userId: string
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


    const navigate = useNavigate()

    // redux store
    const dispatch = useDispatch()

    // function to get all sales
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


    // vertaa page route
    const vertaaRoute = () => {
        const path = "/vertaaPage"
        navigate(path)
    }


    // useEffect to call function
    useEffect(() => {

        getData()


    },[])

    useEffect(() => {

        if (searchWord === '') {
            setRenderSearch(false)
        }


    },[searchWord])



    // submit function. changes render state to true
    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        console.log('submitted')
        console.log('search word', searchWord)

        if (searchWord !== '') {        
            setRenderSearch(true)
        } else if (searchWord === '') {
            setRenderSearch(false)
        }

        }


    // if state === true render SaleSearch component
    if (renderSearch === true ) {
        return (
            <div>
              <div>
                <form className="form" onSubmit={submit} >
                    Search sales <input
                    value={searchWord}
                    onChange={(e) => setSearchWord(e.target.value)}                    

                    />
                    <Button variant="dark" type="submit" >Seach</Button>
                
                </form>
                </div>
                
                <SaleSearch searchWordProp={searchWord} />

                <div>
                    <br/>
                    <Card style={{
                            height: '150px',
                            width: '300px',
                            position: 'relative',
                            right: '0px',
                            borderStyle: 'solid',
                            borderColor: 'black'
                        }
                    } >
                        <p>Search from tori, huutonet and huutokaupat </p>
                        

                        <Button variant="dark" onClick={vertaaRoute} >Vertaa page</Button>
                    </Card>
                </div>
            </div>

            
        )
    }else if (renderSearch === false ) {
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
                    <p>Sales</p>
                    {sales?.map(s => 
                        <li key={s._id} >
                            Product name: {s.product} <br/>
                            Price: {s.price} <br/>
                            ID: {s._id}
                            <ChatRequestButton sellerProp={s.userId} saleIdProp={s._id} />
                            <br/>
                            <br/>
                        </li>)}
                        
                </ul>

                <div>
                    <Button variant="dark" onClick={logout} >Logout</Button>
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


