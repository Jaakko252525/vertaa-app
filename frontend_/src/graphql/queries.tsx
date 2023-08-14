















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
            _id  
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






// mutation to create user
export const CREATE_USER = 
      
      gql`mutation($username: String!, $password: String!) { 
            createNewUser(username: $username, password: $password) {
              username
              password
          }
        }  `



// mutation to delete user
export const DELETE_USER = 
      
      gql`mutation($username: String!, $password: String!) { 
            deleteUser(username: $username, password: $password) {
              username
              password
          }
        }  `


// userSales query
export const USER_SALES = gql`
    query($userSalesId: String!) {
      userSales(id: $userSalesId) {
        _id
        price
        product
        userId
      }
}
`

// toriScraper
export const TORI_SCRAPER = gql `
      mutation($product: String!) {
        toriSearch(product: $product)
      }`



// edit sale
export const EDIT_SALE = gql`
    mutation EditSale($product: String!, $price: String!, $userId: String!, $modifySaleId: String!) {
      modifySale(product: $product, price: $price, userId: $userId, id: $modifySaleId) {
        price
        product
        userId
        
      }
}
`





// addSale mutation
export const ADD_SALE = gql`
      mutation AddSale($product: String!, $price: String!, $userId: String!) {
        addSale(product: $product, price: $price, userId: $userId) {
          product
          price
          userId
        }
      }
    `







