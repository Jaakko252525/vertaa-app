import * as React from "react";
import * as ReactDOM from "react-dom/client";

// react router
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";



// importing components
import App from './App';
import Login from "./components/Login";
import Frontpage from "./components/Frontpage";



// apollo
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

import reportWebVitals from './reportWebVitals';


export const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>
      <App  />
    </div>,
  },
  {
    path: "login",
    element: <Login  />
  },
  {
    path: "etusivu",
    element: <Frontpage />
  }
]);


root.render(
     
  <React.StrictMode>
 <ApolloProvider client={client}>
    <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
