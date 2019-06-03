import React,{useState, useContext} from 'react';
import { Route } from 'react-router-dom';
import classnames from 'classnames';
import routerDecorator from '../../Helpers/withRouter';
import styles from './pages.module.scss'
import {TextField} from "../Common/Form";
import {fieldProps} from "../../Helpers/formFieldHelper";
import Button from "../Common/Control/Button";
import {AuthContext} from "../../Context/AuthContext";
import t from '../../Helpers/texts/getText';
import {ContentContext} from "../../Context/ContentContext";

function Register(props) {
    const [fields,setFields] = useState({newLogin:'', newPassword:'', newEmail:'', confirmPassword:''});
    const {register} = useContext(AuthContext);
    const {language} = useContext(ContentContext);
    const onSubmit = e => {
        e.preventDefault();
        e.stopPropagation();
        register(fields);
    };
    return (
        <div className={classnames(styles.page, styles.register)}>
            <div>
                <h1>{t(language,'login.register.title')}</h1>
                <form style={{maxWidth:'300px', margin:'3rem auto 0 auto', width:'100%'}}>
                    <TextField
                        label={t(language,'login.register.userName')}
                        {...fieldProps("newLogin", "string", { fields, setFields })}
                    />
                    <TextField
                        label={t(language,'login.register.email')}
                        {...fieldProps("newEmail", "string", { fields, setFields })}
                    />
                    <TextField
                        label={t(language,'login.register.password')}
                        type={'password'}
                        {...fieldProps("newPassword", "password", { fields, setFields })}
                    />
                    <TextField
                        label={t(language,'login.register.confirm')}
                        type={'password'}
                        {...fieldProps("confirmPassword", "password", { fields, setFields })}
                    />
                    <Button
                        withoutBorder
                        style={{margin:'4rem auto 1rem auto'}}
                        color={'colored'}
                        fullWidth
                        label={t(language,'login.register.submit')}
                        onClick={(e)=>onSubmit(e)}
                    />
                </form>
            </div>
        </div>
    );
}

export default routerDecorator(Register);
