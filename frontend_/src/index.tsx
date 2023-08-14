import * as React from "react";
import * as ReactDOM from "react-dom/client";


// importing components
import App from './App';


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



// render
root.render(

  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App  />  
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
   
);



reportWebVitals();
