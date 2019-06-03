import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import AboutPage from '../Components/Pages/AboutPage';
import ContactPage from '../Components/Pages/ContactPage';


export default function InfoRoutes() {
    return [
        <Route key path='/about' component={AboutPage}/>,
        <Route key path='/contact' component={ContactPage}/>
    ];
}
