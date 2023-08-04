











// importing useEffect and useState
import { useEffect, useState } from "react"



import { getAllSales } from "../graphql/queries"


const getData = async () => {


    // getting all Sale data from DB
    const data = await getAllSales
    console.log('data fetched', data)
    return data
}



// interface
interface dataInterface {
    product: string
    price: string
}

const Frontpage = () => {

    const [sales, setSales] = useState<dataInterface[]>()

    // fetch data
    useEffect(() => {

        // setting state
        // @ts-ignore
        const data = getData()
        setSales(data);
        console.log('sales', sales);



    }, [])
    


    return (

        <div>
            hello frontpage
        </div>
    )
}




export default Frontpage


