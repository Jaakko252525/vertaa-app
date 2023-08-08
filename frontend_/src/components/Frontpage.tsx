











// importing useState
import { useEffect, useState } from "react"



import { getAllSales } from "../graphql/queries"


// redux hooks
import { useSelector, useDispatch } from 'react-redux'
// redux actions
import { decrement, increment } from '../Redux/counterSlice'


// interface
interface dataInterface {
    product: string
    price: string
}

const Frontpage = () => {
    // state for sales
    const [sales, setSales] = useState<dataInterface[]>()

    // redux store
    // @ts-ignore
    const count = useSelector(state => state.counter.count)
    const dispatch = useDispatch()

    const getData = async () => {

        // use query
        const data = await getAllSales()

        setSales(data.allSales)

    }



    useEffect(() => {

        getData()


    },[])

    // if sales not empty
    if (sales !== undefined) {
        return (
            <div>
                <ul>
                    {sales.map(s => 
                        <li>
                            Product name: {s.product} <br/>
                            Price: {s.price}
                        </li>)}
                </ul>
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


