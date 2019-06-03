import React, {useContext} from "react";
import {BrowserRouter as Router, Switch} from "react-router-dom";
import GuestRoutes from './GuestRoutes';
import BaseUserRoutes from './BaseUserRoutes';
import Main from '../Components/Main/Main';
import InfoRoutes from './InfoRoutes'
import {AuthContext} from "../Context/AuthContext";

export default function AppRouters(props) {
    const {user} = useContext(AuthContext);
    const commonRoutes = InfoRoutes();
    const roleRoutes = user ? BaseUserRoutes() : GuestRoutes();
    const routes = [
        ...commonRoutes,
        ...roleRoutes,
    ];
    return (
        <Router>
            <Main>
                <Switch>
                    {routes.map((Element, index) => <Element.type key={index} {...Element.props} />)}
                </Switch>
            </Main>
        </Router>
    );
}
