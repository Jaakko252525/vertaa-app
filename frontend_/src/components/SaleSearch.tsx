









// bootstrap
import { Button } from "react-bootstrap"

// gql mutation
import { SEARCH_SALE } from "../graphql/queries";

import { useMutation } from "@apollo/client";

// useState
import { useEffect, useState } from "react"


// interface
interface SaleSearchProps {
    searchWordProp: string;
  }


  // sale interface
interface SaleInterface {
    _id: string,
    product: string,
    price: string,
    userId: string
}
  

// SaleSearch
const SaleSearch = (props: SaleSearchProps) => {
  
    const { searchWordProp } = props;

    // state for sales
    const [sales, setSales] = useState<SaleInterface[]>()

    // mutation
    const [search_sale, {data, loading, error}] = useMutation(SEARCH_SALE)


    const fetchSales = async (word: string) => {


        // making the mutation and getting data
        const result = await search_sale({ variables: { product: word } })

    
        const array = result.data.SearchSale

        console.log(array[0].product)

        setSales(array)
}



    useEffect(() => {

        fetchSales(searchWordProp)
    },[])


    if (sales !== undefined ) {



        return (
            <div>
                <ul>
                    {sales.map(s => 
                        <li key={s._id} >
                            Product name: {s.product} <br/>
                            Price: {s.price} <br/>
                            <br/>
                            <br/>
                        </li>)}
                        
                </ul>

                </div>

                    )
                    }

    return (

        <div>

        </div>
    )
}



export default SaleSearch;



