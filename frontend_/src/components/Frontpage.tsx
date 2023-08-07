











// importing useState
import { useEffect, useState } from "react"



import { getAllSales } from "../graphql/queries"




// interface
interface dataInterface {
    product: string
    price: string
}

const Frontpage = () => {

    const [sales, setSales] = useState<dataInterface[]>()


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


