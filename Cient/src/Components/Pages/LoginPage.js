import React,{useState, useContext} from 'react';
import { Route } from 'react-router-dom';
import classnames from 'classnames';
import routerDecorator from '../../Helpers/withRouter';
import styles from './pages.module.scss'
import {TextField} from "../Common/Form";
import Button from "../Common/Control/Button";
import {fieldProps} from '../../Helpers/formFieldHelper';
import {AuthContext} from "../../Context/AuthContext";
import t from '../../Helpers/texts/getText';
import {ContentContext} from "../../Context/ContentContext";

function Login(props) {
    const {user, login} = useContext(AuthContext);
    const {language} = useContext(ContentContext);
    const [fields,setFields] = useState({login:'', password:''});
    const onSubmit = e => {
        e.preventDefault();
        e.stopPropagation();
        login({login: fields.login, password: fields.password})
    };

    return (
        <div className={classnames(styles.page, styles.login)}>
            <div>
                <h1>{t(language,'login.login.title')}</h1>
                <form style={{maxWidth:'300px', margin:'3rem auto 0 auto', width:'100%'}}>
                    <TextField
                        label={t(language,'login.login.userName')}
                        name={"login"}
                        {...fieldProps("login", "string", { fields, setFields })}
                    />
                    <TextField
                        label={t(language,'login.login.password')}
                        type={'password'}
                        name={"password"}
                        {...fieldProps("password", "password", { fields, setFields })}
                    />
                    <Button
                        withoutBorder
                        style={{margin:'4rem auto 1rem auto'}}
                        color={'colored'}
                        fullWidth
                        label={t(language,'login.login.submit')}
                        onClick={(e)=>onSubmit(e)}/>
                </form>
            </div>
        </div>
    );
}



export default routerDecorator(Login);
