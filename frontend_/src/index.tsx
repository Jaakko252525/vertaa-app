import * as React from "react";
import * as ReactDOM from "react-dom/client";

// react router
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


import './index.css';

// importing components
import App from './App';
import Login from "./components/Login";


import reportWebVitals from './reportWebVitals';

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
  }
]);


root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
