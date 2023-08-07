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
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';

//link making thing???
import { setContext } from '@apollo/client/link/context';

import reportWebVitals from './reportWebVitals';




const httpLink = createHttpLink({
  uri: 'http://localhost:4000/',
});


// client
export const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});

// authentication link
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

// another client that need authentication to get through?
export const client_2 = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


// router for pages
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

// render
root.render(
     
  <React.StrictMode>
 <ApolloProvider client={client}>
    <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
  
);



reportWebVitals();
