import React, {useRef, useEffect, useState} from 'react';
import Header from './Header';
import Footer from './Footer';
import styles from './main.module.scss'
import routerDecorator from '../../Helpers/withRouter';

function Main(props) {
    return (
        <div className={styles.container}>
            <Header className={styles.header}/>
            <div className={styles.content}>
                {props.children}
            </div>
            <Footer className={styles.footer}/>
        </div>
    );
}

export default routerDecorator(Main);
