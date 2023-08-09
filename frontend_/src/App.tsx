import React from 'react';
import './App.css';

// router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


// importing PrivateRoute
import PrivateRoute from './components/PrivateRoute';

// components
import Login from './components/Login';
import Frontpage from './components/Frontpage';


// functions for routes


const App = () => {




  return (
    <div>
      <h1> Hello world</h1>
      <div>
        <Router>
          <Routes>
            <Route path="/login" element={<Login  />}></Route>
            <Route path='frontpage' element={<PrivateRoute childrenProp={<Frontpage/>}/>}>


            </Route>
          </Routes>
      </Router>
      </div>

    </div>
  );
}

export default App;











