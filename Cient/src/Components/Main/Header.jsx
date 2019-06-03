import React, {useContext, useState} from "react";
import {Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import routerDecorator from '../../Helpers/withRouter';
import Links from "../Common/Links/Links";
import Logo from "../Common/Icons/Logo";
import styles from './main.module.scss'
import Button from "../Common/Control/Button";
import {AuthContext} from "../../Context/AuthContext";
import t from '../../Helpers/texts/getText';
import {ContentContext} from "../../Context/ContentContext";

Navbar.propTypes = {
    location: PropTypes.object.isRequired
};
const GUEST_LINKS = ["contact", "about"];
const USER_LINKS = ["cabinet", "contact", "about"];
function Navbar(props) {
    const {user, setUser} = useContext(AuthContext);
    const {language} = useContext(ContentContext);
    const {className} = props;
    return (
        <div className={className}>
            <div/>
            <Logo/>
            <Links links={ user ? USER_LINKS : GUEST_LINKS } prefix='header.links'/>
            {!user
                ? <>
                    <Route
                        render = {({history}) =>
                            <Button
                                style={{margin:'1rem 0 0 -2rem', color: 'black'}}
                                withoutPadding
                                withoutBorder
                                label={t(language,'header.buttons.signUp')}
                                size={'tiny'}
                                onClick={()=>history.push('register')}
                            />}
                    />
                    <Route
                        render = {({history}) =>
                            <Button
                                withoutBorder
                                withoutPadding
                                label={t(language,'header.buttons.signIn')}
                                size={'tiny'}
                                color={'colored'}
                                onClick={()=>history.push('login')}
                            />}
                    />
                    </>
                : <>
                    <p>{user.login}</p>
                    <Route
                        render = {({history}) =>
                            <Button
                                withoutPadding
                                withoutBorder
                                label={t(language,'header.buttons.logOut')}
                                size={'tiny'}
                                color={'colored'}
                                onClick={() => {
                                    setUser(null);
                                    history.push('login')
                                }}
                            />}
                    />
                  </>
            }

        </div>
    )
}

export default routerDecorator(Navbar);

