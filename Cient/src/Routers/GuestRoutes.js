import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import LoginPage from "../Components/Pages/LoginPage";
import RegisterPage from "../Components/Pages/RegisterPage";


export default function GuestRoutes() {
    return [
        <Route exact path='/login' component={LoginPage}/>,
        <Route exact path='/register' component={RegisterPage}/>,
        <Redirect to='/login'/>
    ];
}
