











// importing apollo client



// importing graphql
import { gql } from "@apollo/client";
import { client } from "..";


// interface
interface dataInterface {
    product: string
    price: string
}


export const getAllSales = () => {


    // calling client
    client
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
    .then((result) => console.log('this is result', result) );



}



