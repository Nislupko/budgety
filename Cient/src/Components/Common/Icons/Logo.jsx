import React from 'react';
import styles from './Logo.module.scss';
import {Route} from 'react-router-dom';

export default function Logo() {
    return (
        <Route
            render = {({history}) => (
                <div onClick={()=>{history.push('/about')}} className={styles.logo}/>
            )}
        />
    )
}