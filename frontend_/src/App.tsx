import React from 'react';
import './App.css';

// router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
            <Route path='frontpage' element={<Frontpage  />} />
          </Routes>
      </Router>
      </div>

    </div>
  );
}

export default App;











