















// importing apollo client



// importing graphql
import { gql } from "@apollo/client";
import { client } from "..";

// importing graphql client
import { client_2 } from '../index'



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



// login query
export const LOGIN_MUTATION = async () => {
    
    const LOGIN = gql`
        mutation Login($username: String!, $password: String!) {
           login(username: $username, password:$password) {
             username
             password
           } 
        }`
    
        console.log('this is login in gql', LOGIN)

    // returning data
    return LOGIN
}





export const LOGIN = gql`
mutation Login($username: String!, $password: String!) {
   login(username: $username, password:$password) {
     username
     password
   } 
}`















