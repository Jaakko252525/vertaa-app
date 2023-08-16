









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
    const [renderNotFound, setRenderNotFound] = useState(false)

    // mutation
    const [search_sale, {data, loading, error}] = useMutation(SEARCH_SALE)


    const fetchSales = async () => {
      


        // making the mutation and getting data
        const result = await search_sale({ variables: { product: searchWordProp } })


        const array = result.data.SearchSale

        if (array.length > 0) {
            await setSales(array)
            await setRenderNotFound(false)
        } else {
            await setRenderNotFound(true)
        }


}



    useEffect(() => {

        fetchSales()
    
    },[searchWordProp])


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
    } else if ( renderNotFound === true) {
        return (
            <div>
                No sales!
            </div>
        )
    }
    return (

        <div>

        </div>
    )
}



export default SaleSearch;



