











// importing apollo client



// importing graphql
import { gql } from "@apollo/client";
import { client } from "..";


// interface
interface dataInterface {
    product: string
    price: string
}


export const getAllSales = async () => {


    // calling client
    const data = await client
    .query({
    query: gql`
        query {
        allSales {
            price
            product
        }
    }
        
    `,
    })

    return data.data




}



