import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Navigat from './Navigat';
import HomePage from './HomePage';
import SignUp from './SignUp';
import Login from './Login';
import Disease from './disease/Disease';
import Basement from './Basement';
import Search from './Search';
import ChooseDoc from './ChooseDoc';
import PersonalAcc from './personal/PersonalAcc';
import Test from './disease/Test'
import GeneSearch from './search_and_visualization/GeneSearch'


import '../style/personal/index.css';
import '../style/personal/homePage.css';
import './index.html';
import '../style/personal/signUp.css';
import '../style/personal/Search.css';
import '../style/personal/Result.css';
import '../style/personal/chooseDoc.css';
import '../style/personal/personalAcc.css';
import '../style/disease/disease.css'

const div = document.createElement('div');
div.setAttribute('id', 'app');
document.body.appendChild(div);
const root = ReactDOM.createRoot(document.getElementById('app'));

root.render(
    <Router>
        <Routes>
            <Route path="/" element={<Navigat/>}>
                <Route index element={<HomePage/>}/>
                <Route path="profile" element={<PersonalAcc/>}/>
                <Route path="signup" element={<SignUp/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="search" element={<Search/>}/>
                <Route path="disease" element={<Disease/>}/>
                <Route path="choosingDoc" element={<ChooseDoc/>}/>
                <Route path="test" element={<Test/>}/>
                <Route path="visualization" element={<GeneSearch/>}/>
            </Route>
        </Routes>
        <Basement/>
    </Router>
);
