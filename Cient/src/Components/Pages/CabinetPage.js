import React,{useContext, useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import routerDecorator from '../../Helpers/withRouter';
import styles from './pages.module.scss'
import t from '../../Helpers/texts/getText'
import Links from '../Common/Links/Links'
import {ContentContext} from "../../Context/ContentContext";
import Button from "../Common/Control/Button";
import {TextField} from "../Common/Form";
import {fieldProps} from "../../Helpers/formFieldHelper";
import Select from 'react-select';
import {default as Statistic} from './Statistic'

const LINKS = [
    "cabinet/history",
    "cabinet/edit",
    "cabinet/aims",
    "cabinet/statistic"
];

function Cabinet(props) {
    const {history, purses, getHistory, getPurses, getUserCategories, language} = useContext(ContentContext);
    useEffect(() => {
        getHistory();
        getPurses();
        getUserCategories();
        },[]);
    const {
        match: {
            params: { info }
        }
    } = props;
    return (
        <div className={classnames(styles.page,styles.cabinet)}>
            <section className={styles.content}>
                <h1>{t(language,`cabinet.${info}.subHeader`)}</h1>
                <Links
                    className={styles.links}
                    prefix="cabinet.links"
                    type="underline"
                    links={LINKS}
                />
                {info === 'history' && <ShowHistoryBlock history={history} purses={purses}/>}
                {info === 'edit' && <EditBlock history={history} purses={purses}/>}
                {info === 'aims' && <PurposeBlock />}
                {info === 'statistic' && <Statistic/>}
            </section>
        </div>
    );
}

const PurposeBlock = _ => {
    const {language, purses} = useContext(ContentContext);
    const [fields, setFields] = useState({purse: null, id: null, finalDate: null, finalAmount: null, comment: null, newAmount:null, startDate: null, amount: 0});
    useEffect(()=>{
        if (inputRefFinalAmount && inputRefFinalAmount.current) inputRefFinalAmount.current.valueAsNumber = fields.finalAmount;
        if (inputRefFinalDate && inputRefFinalDate.current) inputRefFinalDate.current.valueAsString = fields.finalDate;
        if (inputRefNewAmount && inputRefNewAmount.current) inputRefNewAmount.current.valueAsNumber = fields.newAmount;
        if (inputRefComment && inputRefComment.current) {inputRefComment.current.value = fields.comment;}
        console.log(fields);
        },[fields]);
    const onSubmit = e => {
        e.preventDefault();
        e.stopPropagation();
    };
    const [inputRefFinalAmount, setInputRefFinalAmount] = useState(null);
    const [inputRefFinalDate, setInputRefFinalDate] = useState(null);
    const [inputRefNewAmount, setInputRefNewAmount] = useState(null);
    const [inputRefComment, setInputRefComment] = useState(null);
    return (
        <div className={styles.purpose}>
            <div className={styles.chooseBlock}>
            {
                purses.map(purse => {
                    return (
                        <>
                            <h3>{purse.name}</h3>
                            <div className={styles.purposeButtons}>
                            {
                                purse.purposes.map(purpose =>
                                    <Button
                                        style={{marginTop:'1rem', padding:'0 2rem 0 2rem'}}
                                        label={purpose.name}
                                        color={'whiteBack'}
                                        fullWidth
                                        withoutBorder
                                        onClick={() => setFields({
                                            comment: purpose.comment,
                                            finalAmount: purpose.finalAmount,
                                            startDate: purpose.startDate && purpose.startDate.toLocaleString().substr(0,10),
                                            amount: purpose.amount,
                                            finalDate: purpose.finalDate && purpose.finalDate.toLocaleString().substr(0,10),
                                            purse,
                                            id: purpose.id
                                        })}
                                    />
                                )
                            }
                                <Button
                                    style={{marginTop:'1rem', padding:'0 2rem 0 2rem'}}
                                    label={'Создать цель'}
                                    color={'gray'}
                                    fullWidth
                                    withoutBorder
                                    onClick={() => setFields({
                                        comment:'',
                                        finalAmount: 10000,
                                        amount: 0,
                                        finalDate: null,
                                        startDate: (new Date).toLocaleDateString(),
                                        purse,
                                        id: null
                                    })}
                                />
                            </div>
                        </>
                    )

                })
            }
            </div>
            <div className={styles.editBlock}>
                { fields.purse &&
                    <form className={styles.form} >
                        <div className={styles.left}>
                            <div className={styles.staticInfo}>
                                <p>Текущий баланс</p>
                                <p>{fields.amount}</p>
                            </div>
                            <div className={styles.staticInfo}>
                                <p>Начальная дата</p>
                                <p>{fields.startDate}</p>
                            </div>
                            <TextField
                                setInputRef={setInputRefComment}
                                label='Комментарий'
                                {...fieldProps("comment", "string", {fields, setFields})}
                            />
                        </div>
                        <div className={styles.right}>
                            <TextField
                                setInputRef={setInputRefFinalAmount}
                                label='Итоговая сумма'
                                {...fieldProps("finalAmount", "number", {fields, setFields})}
                            />
                            <TextField
                                setInputRef={setInputRefFinalDate}
                                label='Итоговая дата'
                                {...fieldProps("finalDate", "string", {fields, setFields})}
                            />
                            <TextField
                                setInputRef={setInputRefNewAmount}
                                label='Вносимая сумма'
                                {...fieldProps("newAmount", "number", {fields, setFields})}
                            />
                        </div>
                        <div className={styles.center}>
                            <Button
                                withoutBorder
                                style={{margin: '4rem auto 1rem auto'}}
                                color={'colored'}
                                fullWidth
                                label={t(language, 'cabinet.edit.button')}
                                onClick={e => onSubmit(e)}/>
                        </div>

                    </form>
                }
            </div>
        </div>
    )
};

const ShowHistoryBlock = ({history, purses}) => {
    const {language} = useContext(ContentContext);
    return (
        <div className={styles.history}>
            {
                purses.map(purse => {
                    return(
                        <>
                        <p className={styles.purseName}>{purse.name}</p>
                        <div className={styles.purseBlock}>
                            <div className={styles.purseHistoryHeaders}>
                                <div>{t(language,'cabinet.history.category')}</div>
                                <div>{t(language,'cabinet.history.amount')}</div>
                                <div>{t(language,'cabinet.history.movement')}</div>
                                <div>{t(language,'cabinet.history.date')}</div>
                                <div>{t(language,'cabinet.history.comment')}</div>
                            </div>
                            <div className={styles.purseBlock}>
                            {history
                                .filter(record => record.purse === purse.id)
                                .sort((x,y) => {
                                    if (x.date > y.date) return -1;
                                    if (x.date < y.date) return 1;
                                    return y.id-x.id;

                                })
                                .map(record => {
                                    const {category, amount, balance, date, comment} = record;
                                    const color = amount > 0 ? styles.green : styles.red;
                                    return (
                                        <div className={styles.purseHistory}>
                                            <p>{category}</p>
                                            <p className={color}>{amount}</p>
                                            <p className={color}> {balance}</p>
                                            <p>{date.toLocaleDateString()}</p>
                                            <div>
                                                <p style={{margin:'0.65rem 0 0 0'}}>{comment}</p>
                                            </div>
                                        </div>)}
                                )
                            }
                            </div>
                        </div>
                        </>
                    )
                })
            }
        </div>
    )
};

const EditBlock = ({history, purses}) => {
    const {language} = useContext(ContentContext);
    const [recordType, setRecordType] = useState('history');
    const headers = {
        'history': t(language,'cabinet.edit.history.subtitle'),
        'purse': t(language,'cabinet.edit.purse.subtitle'),
        'category': t(language,'cabinet.edit.category.subtitle'),
        'people': t(language,'cabinet.edit.people.subtitle')
    };
    return (
        <>
            <h3>{headers[recordType]}</h3>
            <div className={styles.edit}>

                {recordType === "history"  && <AddHistoryRowBlock />}
                {recordType === "purse" && <AddPurseBlock purses={purses}/>}
                {recordType === "category" && <AddCategoryBlock />}
                {recordType === "people" && <AddPeopleBlock />}
                <div className={styles.editButtons}>
                    <Button
                        label={t(language,'cabinet.edit.history.button')}
                        withoutBorder
                        size={'tiny'}
                        color={'colored'}
                        onClick={() => setRecordType('history')}
                    />
                    <Button
                        label={t(language,'cabinet.edit.purse.button')}
                        withoutBorder
                        size={'tiny'}
                        color={'colored'}
                        onClick={() => setRecordType('purse')}
                    />
                    <Button
                        label={t(language,'cabinet.edit.category.button')}
                        withoutBorder
                        size={'tiny'}
                        color={'colored'}
                        onClick={() => setRecordType('category')}
                    />
                    <Button
                        label={t(language,'cabinet.edit.people.button')}
                        withoutBorder
                        size={'tiny'}
                        color={'colored'}
                        onClick={() => setRecordType('people')}
                    />
                </div>
            </div>
        </>
    )
};

const AddPurseBlock = ({purses}) => {
    const [fields,setFields] = useState({purse: '', amount: 0});
    const {addPurse, language} = useContext(ContentContext);
    const onSubmit = e => {
        e.preventDefault();
        e.stopPropagation();
        addPurse(fields);
    };
    return (
        <div className={styles.addPurse}>
            <div className={styles.content}>
                <div className={styles.currentPurses}>
                    <h3>{t(language,'cabinet.edit.purse.leftInfo')}</h3>
                    <ul>
                    {purses.map((elem, index) => <li key={index} className={styles.purse}>{elem.name} {elem.balance}</li>)}
                    </ul>
                </div>
                <form style={{maxWidth:'300px', margin:'2rem auto 0 auto', width:'100%'}}>
                    <TextField
                        label={t(language,'cabinet.edit.purse.purse')}
                        {...fieldProps("purse", "string", { fields, setFields })}
                    />
                    <TextField
                        label={t(language,'cabinet.edit.purse.amount')}
                        value={0}
                        {...fieldProps("amount", "number", { fields, setFields })}
                    />
                    <Button
                        withoutBorder
                        style={{margin:'4rem auto 1rem auto'}}
                        color={'colored'}
                        fullWidth
                        label={t(language,'cabinet.edit.button')}
                        disabled={fields.purse === '' || fields.amount === ''}
                        onClick={(e)=>onSubmit(e)}/>
                </form>
            </div>
        </div>
    )
};

const AddHistoryRowBlock = () => {
    const {addHistoryRow, purses,history, categories, language} = useContext(ContentContext);
    const [fields, setFields] = useState({category:'', amount: 0, purse: '', comment: ''});
    const [purse, setPurse] = useState(purses[0]||null);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const purseOptions = purses.map(elem => {return {purse: elem, value: elem.id, label: elem.name}});

    useEffect(() => {
        const newPurseCategories = purse.categories;
        const fullListOfCategories = [...newPurseCategories, ...categories];
        const categoryOptions = fullListOfCategories.map(elem => {
            return {value: elem, label: elem}
        });
        setCategoryOptions(categoryOptions);
        const sameOption = categoryOptions.filter(elem => elem.value === fields.category.value);
        if (sameOption.length === 0) setFields({...fields, category: ''});
    },[purse]);

    const onSubmit = e => {
        e.preventDefault();
        e.stopPropagation();
        addHistoryRow({...fields, purse: fields.purse.value, category: fields.category.value });
    };
    const handleChangeCategory = option => setFields({...fields, category: option});
    const handleChangePurse = option => {
        setFields({...fields, purse: option});
        setPurse(option.purse);
    };

    const customStyles = {
        option: (provided, state) => ({
            ...provided,
        }),
        control: () => ({
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            WebKitFlexDirection: 'row',
            backgroundColor: '#ffffff',
            borderRadius:'2px',
            marginBottom: '1rem',
        })
    };

    return (
        <div className={styles.addPurse}>
            <div className={styles.content}>
                <div className={styles.currentPurses}>
                    <h3>{t(language,'cabinet.edit.history.leftInfo')}</h3>
                    <ul>
                        {
                            history
                                .filter(elem => elem.date - (new Date) < 7200)
                                .map((elem, index) => <li key={index}>{elem.category} {elem.amount}</li>)
                        }
                    </ul>
                </div>
                <div className={styles.form} style={{maxWidth:'300px', margin:'auto auto auto auto', width:'100%'}}>
                    <form >
                        <Select
                            styles={customStyles}
                            isSearchable
                            value={fields.purse}
                            onChange={handleChangePurse}
                            options={purseOptions}
                            placeholder={t(language,'cabinet.edit.history.purse')}
                        />
                        <Select
                            styles={customStyles}
                            isSearchable
                            value={fields.category}
                            onChange={handleChangeCategory}
                            options={categoryOptions}
                            placeholder={t(language,'cabinet.edit.history.category')}
                        />

                        <TextField
                            style={{marginTop:'2rem'}}
                            label={t(language,'cabinet.edit.history.amount')}
                            value={fields.amount}
                            {...fieldProps("amount", "number", { fields, setFields })}
                        />
                        <TextField
                            label={t(language,'cabinet.edit.history.comment')}
                            value={fields.comment}
                            {...fieldProps("comment", "string", { fields, setFields })}
                        />
                        <Button
                            withoutBorder
                            style={{margin:'4rem auto 1rem auto'}}
                            color={'colored'}
                            fullWidth
                            label={t(language,'cabinet.edit.button')}
                            disabled={fields.category === '' || fields.amount === '' || fields.purse === ''}
                            onClick={e => onSubmit(e)}
                        />
                    </form>
                </div>
            </div>
        </div>
    )
};

const AddCategoryBlock = () => {
    const {addCategory, purses, categories, language} = useContext(ContentContext);
    const defaultSelectValue = {purse: {}, value: null, label: t(language,'cabinet.edit.category.default')};
    const purseOptions = purses.map(elem => {return {purse: elem, value: elem.id, label: elem.name}});
    purseOptions.push(defaultSelectValue);
    const [fields,setFields] = useState({category: '', purse: defaultSelectValue});
    const customStyles = {
        option: (provided, state) => ({
            ...provided,
        }),
        control: () => ({
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            WebKitFlexDirection: 'row',
            backgroundColor: '#ffffff',
            borderRadius:'2px',
            marginBottom: '1rem',
        })
    };
    const onSubmit = e => {
        e.preventDefault();
        e.stopPropagation();
        addCategory({category: fields.category, purse: fields.purse.value });
    };
    const handleChangePurse = option => setFields({...fields, purse: option});
    return (
        <div className={styles.addPurse}>
            <div className={styles.content}>
                <div className={styles.currentPurses}>
                    <h3>{t(language,'cabinet.edit.category.leftInfo')}</h3>
                    <ul>
                        {
                            purses.map((curPurse, index) => {
                                return(
                                    <div key={index}>
                                        <h3>{curPurse.name}</h3>
                                        {curPurse.categories.map((cat, i) =>  <li key={i} className={styles.purse}>{cat}</li>)}
                                    </div>
                                )
                            })
                        }
                        <div>
                            <h3>{t(language,'cabinet.edit.category.universal')}</h3>
                            {
                                categories.map((cat, i) => <li key={i} className={styles.purse}>{cat}</li>)
                            }
                        </div>
                    </ul>
                </div>
                <form style={{maxWidth:'300px', margin:'2rem auto 0 auto', width:'100%'}}>
                    <TextField
                        label={t(language,'cabinet.edit.category.category')}
                        {...fieldProps("category", "string", { fields, setFields })}
                    />
                    <Select
                        styles={customStyles}
                        isSearchable
                        value={fields.purse}
                        onChange={handleChangePurse}
                        options={purseOptions}
                        placeholder={t(language,'cabinet.edit.category.purse')}
                    />
                    <Button
                        withoutBorder
                        style={{margin:'4rem auto 1rem auto'}}
                        color={'colored'}
                        fullWidth
                        label={t(language,'cabinet.edit.button')}
                        disabled={fields.category === ''}
                        onClick={e => onSubmit(e)}/>
                </form>
            </div>
        </div>
    )
};

const AddPeopleBlock = () => {
    const {addPeople, purses, language} = useContext(ContentContext);
    const purseOptions = purses.map(elem => {return {value: elem.id, label: elem.name}});
    const [fields,setFields] = useState({login: '', purse: purseOptions[0] || ''});
    const customStyles = {
        option: (provided, state) => ({
            ...provided,
        }),
        control: () => ({
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            WebKitFlexDirection: 'row',
            backgroundColor: '#ffffff',
            borderRadius:'2px',
            marginBottom: '1rem',
        })
    };
    const onSubmit = e => {
        e.preventDefault();
        e.stopPropagation();
        addPeople({login: fields.login, purse: fields.purse.value });
    };
    const handleChangePurse = option => setFields({...fields, purse: option});
    return (
        <div className={styles.addPurse}>
            <div className={styles.content}>
                <div className={styles.currentPurses}>
                    <h3>{t(language,'cabinet.edit.people.leftInfo')}</h3>
                    <ul>
                        {
                            purses.map((curPurse, index) => {
                                return(
                                    <div key={index}>
                                        <h3>{curPurse.name}</h3>
                                        {curPurse.owners.map((owner, i) =>  <li key={i} className={styles.purse}>{owner}</li>)}
                                    </div>
                                )
                            })
                        }
                    </ul>
                </div>
                <form style={{maxWidth:'300px', margin:'2rem auto 0 auto', width:'100%'}}>
                    <TextField
                        label={t(language,'cabinet.edit.people.user')}
                        {...fieldProps("login", "string", { fields, setFields })}
                    />
                    <Select
                        styles={customStyles}
                        isSearchable
                        value={fields.purse}
                        onChange={handleChangePurse}
                        options={purseOptions}
                        placeholder={t(language,'cabinet.edit.people.purse')}
                    />
                    <Button
                        withoutBorder
                        style={{margin:'4rem auto 1rem auto'}}
                        color={'colored'}
                        fullWidth
                        label={t(language,'cabinet.edit.button')}
                        disabled={fields.login === ''}
                        onClick={e => onSubmit(e)}/>
                </form>
            </div>
        </div>
    )
};

export default routerDecorator(Cabinet);