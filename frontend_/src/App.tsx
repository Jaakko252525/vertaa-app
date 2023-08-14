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
import CreateNewUser from './components/CreateNewUser';
import DeleteUser from './components/DeleteUser';
import Vertaa from './components/Vertaa';



// enabling bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {



  return (
    <div>
      <div>
        <Router>
          <Routes>
            <Route path="/login" element={<Login  />}></Route>
            <Route path="/frontpage" element={<PrivateRoute childrenProp={<Frontpage/>}/>}></Route>
            <Route path="/userProfile" element={<PrivateRoute childrenProp={<UserProfile/>}/> }></Route>
            <Route path="/createNewUser" element={<CreateNewUser/>}  ></Route>
            <Route path="/deleteUser" element={<PrivateRoute childrenProp={<DeleteUser/>} />}></Route>

            <Route path="/vertaapage" element={<Vertaa  />}  />
          </Routes>
      </Router>

      </div>


    </div>
  );
}

export default App;











