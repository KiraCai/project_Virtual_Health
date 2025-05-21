import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigat from './Navigat';
import HomePage from './HomePage';
import SignUp from './SignUp';
import Login from './Login';
import Blogs from './Blogs';
import Basement from './Basement';
import Search from './Search';
import ChooseDoc from './ChooseDoc';
import PersonalAcc from './personal/PersonalAcc';

import '../style/personal/index.css';
import '../style/personal/homePage.css';
import './index.html';
import '../style/personal/signUp.css';
import '../style/personal/Search.css';
import '../style/personal/Result.css';
import '../style/personal/chooseDoc.css';
import '../style/personal/personalAcc.css';

const div = document.createElement('div');
div.setAttribute('id', 'app');
document.body.appendChild(div);
const root = ReactDOM.createRoot(document.getElementById('app'));

root.render(
    <Router>
      <Routes>
        <Route path="/" element={<Navigat />}>
          <Route index element={<HomePage />} />
          <Route path="personal" element={<PersonalAcc />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="search" element={<Search />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="choosingDoc" element={<ChooseDoc />} />
        </Route>
      </Routes>
      <Basement />
    </Router>
);
