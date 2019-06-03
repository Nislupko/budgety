import React,{useContext, useState} from "react";
import PropTypes from 'prop-types';
import Select from 'react-select';
import styles from './main.module.scss';
import t from '../../Helpers/texts/getText';
import routerDecorator from '../../Helpers/withRouter';
import {ContentContext} from "../../Context/ContentContext";


Footer.propTypes = {
    location: PropTypes.object.isRequired
};

function Footer(props) {
    const {location, className} = props;

    const {language, setLanguage} = useContext(ContentContext);
    const LANGUAGES = [
        {value: 'rus', label: 'Русский'},
        {value: 'eng', label: 'English'}
    ];
    const [curLanguage, setCurLanguage] = useState(LANGUAGES[0]);
    const handleChangeLanguage = option => {setCurLanguage(option); setLanguage(option.value)};
    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            width: '120px',
            backgroundColor: 'white',
            color:'black'
        }),
        control: () => ({
            width: '120px',
            display: 'flex',
            flexDirection: 'row',
            WebKitFlexDirection: 'row',
            backgroundColor: '#ffffff',
            borderRadius:'2px',
            marginBottom: '1rem',
        }),
        menu: ()=> ({
            width: '120px',
            marginTop:'-8rem'
        })
    };
    return (
       <div className={styles.footer} >
           <div className={styles.content}>
               <div>{t(language,'footer.left')}</div>
               <div>
                   <Select
                       styles={customStyles}
                       isSearchable
                       value={curLanguage}
                       onChange={handleChangeLanguage}
                       options={LANGUAGES}
                   />
               </div>
           </div>
       </div>
    );
}

export default routerDecorator(Footer);

