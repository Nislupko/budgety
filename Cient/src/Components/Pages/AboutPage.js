import React,{useContext} from 'react';
import { Route } from 'react-router-dom';
import classnames from 'classnames';
import routerDecorator from '../../Helpers/withRouter';
import styles from './pages.module.scss';
import t from '../../Helpers/texts/getText';
import {ContentContext} from "../../Context/ContentContext";

function About(props) {
    const {language}=useContext(ContentContext);
    return (
        <div className={classnames(styles.page, styles.about)}>
            <div>
                <h1>{t(language,'about.title')}</h1>
                <section>
                    <h2>{t(language,'about.firstHeader')}</h2>
                    <span>
                        <p>{t(language,'about.p1')}</p>
                        <p>{t(language,'about.p2')}</p>
                        <p>{t(language,'about.p3')}</p>
                        <p>{t(language,'about.p4')}</p>
                        <p>{t(language,'about.p5')}</p>
                    </span>
                </section>
                <section>
                    <h2>{t(language,'about.secondHeader')}</h2>
                    <span>
                        <p>{t(language,'about.p6')}.</p>
                    </span>
                </section>
                <section>
                    <h2>{t(language,'about.thirdHeader')}</h2>
                    <span style={{display:'flex'}}>
                        <Route
                            render = {({history}) => <p style={{cursor:'pointer'}} onClick={()=>{history.push('/contact')}}><u>{t(language,'about.link')}</u></p>}
                        />
                        <p>&nbsp;{t(language,'about.p7')}</p>
                    </span>
                </section>

            </div>
        </div>
    );
}

export default routerDecorator(About);
