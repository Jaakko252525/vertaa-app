















// importing apollo client



// importing graphql
import { gql } from "@apollo/client";
import { client } from "..";




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


/*
// apollo client userSales gql
export const userSales = async () => {
  // calling client
  const data = await client
  .query({
    query: gql`
      query($userSalesId: String) {
        userSales(id: $userSalesId)
  }
      
  `,
  })

  return data.data




}
*/



export const LOGIN = gql`
mutation Login($username: String!, $password: String!) {
   login(username: $username, password:$password) {
     username
     password
     id
   } 
}`




export const USER_SALES = gql`
  query GetUserSales($userSalesId: String!) {
    userSales(id: $userSalesId)
  }


`



// mutation to create user

export const CREATE_USER = 
      
      gql`mutation($username: String!, $password: String!) { 
            createNewUser(username: $username, password: $password) {
              username
              password
          }
        }  `







