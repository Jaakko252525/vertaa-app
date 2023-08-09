import React from 'react';
import './App.css';

// router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


// importing PrivateRoute
import PrivateRoute from './components/PrivateRoute';

// components
import Login from './components/Login';
import Frontpage from './components/Frontpage';
import UserProfile from './components/UserProfile';

// functions for routes


const App = () => {




  return (
    <div>
      <h1>Vertaa app</h1>
      <div>
        <Router>
          <Routes>
            <Route path="/login" element={<Login  />}></Route>
            <Route path="/frontpage" element={<PrivateRoute childrenProp={<Frontpage/>}/>}></Route>
            <Route path="userProfile" element={<PrivateRoute childrenProp={<UserProfile/>}/> }></Route>
          </Routes>
      </Router>
      </div>

    </div>
  );
}

export default App;











