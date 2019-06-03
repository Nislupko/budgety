import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import routerDecorator from '../../Helpers/withRouter';
import styles from './pages.module.scss'
import t from '../../Helpers/texts/getText'
import {ContentContext} from "../../Context/ContentContext";

function Contact(props) {
    const {language} = useContext(ContentContext);
    return (
        <div className={classnames(styles.page,styles.contact)}>
            <div>
                <h1>{t(language,'contact.title')}</h1>
                <div className={styles.text}>
                    <h3>{t(language,'contact.subHeader')}</h3>
                </div>
                <div className={styles.cards}>
                    <div>
                        <h4>{t(language,'contact.cards.general.title')}</h4>
                        <span>
                            <p>{t(language,'contact.cards.general.skype')}</p>
                            <p>{t(language,'contact.cards.general.email')}</p>
                            <p>{t(language,'contact.cards.general.telegram')}</p>
                        </span>
                    </div>
                    <div>
                        <h4>{t(language,'contact.cards.director.title')}</h4>
                        <span>
                            <p>{t(language,'contact.cards.director.skype')}</p>
                            <p>{t(language,'contact.cards.director.email')}</p>
                            <p>{t(language,'contact.cards.director.phone')}</p>
                        </span>
                    </div>
                    <div>
                        <h4>{t(language,'contact.cards.support.title')}</h4>
                        <span>
                            <p>{t(language,'contact.cards.general.skype')}</p>
                            <p>{t(language,'contact.cards.general.email')}</p>
                        </span>
                    </div>
                    <div>
                        <h4>{t(language,'contact.cards.service.title')}</h4>
                        <span>
                            <p>{t(language,'contact.cards.general.email')}</p>
                            <p>{t(language,'contact.cards.general.telegram')}</p>
                        </span>
                    </div>
                </div>

            </div>
        </div>
);
}

export default routerDecorator(Contact);