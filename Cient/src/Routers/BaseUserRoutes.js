import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import CabinetPage from "../Components/Pages/CabinetPage";


export default function InfoRoutes() {
    return [
        <Route key path='/cabinet/:info' component={CabinetPage}/>,
        <Redirect to='/cabinet/history'/>
    ];
}
