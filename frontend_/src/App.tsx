import React from 'react';
import './App.css';

// router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// useSelector
import { useSelector } from 'react-redux';

// importing PrivateRoute
import PrivateRoute from './components/PrivateRoute';

// components
import Login from './components/Login';
import Frontpage from './components/Frontpage';
import UserProfile from './components/UserProfile';
import CreateNewUser from './components/CreateNewUser';
import DeleteUser from './components/DeleteUser';
import Vertaa from './components/Vertaa';
import AddSaleForm from './components/AddSaleForm';
import Chatroom from './components/Chatroom';


// enabling bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';


interface reduxStore {
  user: {
    id: string,
    username: string,
    password: string
  },
  chatReqId: {
    chatReqID: string,
    buyerID: string
  }
}




const App = () => {

  // user from redux store
  const user = useSelector( (state: reduxStore) => state.user)

  // chatreqid fro redux store
  const chatReqId = useSelector( (state: reduxStore) => state.chatReqId)

  return (
    <div>
      <div >
        <Router>
          <Routes>
            <Route  path="/login" element={<Login  />}></Route>
            <Route path="/frontpage" element={<PrivateRoute childrenProp={<Frontpage/>}/>}></Route>
            <Route path="/userProfile" element={<PrivateRoute childrenProp={<UserProfile/>}/> }></Route>
            <Route path="/createNewUser" element={<CreateNewUser/>}  ></Route>
            <Route path="/deleteUser" element={<PrivateRoute childrenProp={<DeleteUser/>} />}></Route>
            <Route path="/addSale" element={<PrivateRoute childrenProp={<AddSaleForm userIdProp={user.id} />} />}></Route>

            <Route path="/addSale" element={<PrivateRoute childrenProp={<AddSaleForm userIdProp={user.id} />} />}></Route>


            <Route path="/chatRoom" element={<PrivateRoute childrenProp={<Chatroom  chatRequestIDProp={chatReqId.chatReqID}/>} />}></Route>
            <Route path="/buyersSideChatroom" element={<PrivateRoute childrenProp={<Chatroom  chatRequestIDProp={chatReqId.chatReqID}/>} />}></Route>

            <Route path="/vertaapage" element={<Vertaa  />}  />
          </Routes>
      </Router>

      </div>


    </div>
  );
}

export default App;











