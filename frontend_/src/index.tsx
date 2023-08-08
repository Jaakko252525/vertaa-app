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
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';


import reportWebVitals from './reportWebVitals';

// redux
import { Provider } from 'react-redux'

// store 
import store from './Redux/store'


// client
export const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});





const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


// router for pages
const router = createBrowserRouter(
  [
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
  },
  {
    path: "*",
    element: <div> Theres nothing here: 404!</div>
  }
]);

// render
root.render(

  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
   
);



reportWebVitals();
