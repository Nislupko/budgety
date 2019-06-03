import React from 'react';
import {AuthContext} from "./AuthContext";
import makeHttpRequest from "../Helpers/http/makeHttpRequest";

const ContentContext = React.createContext('content');

class ContextContainer extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            history: [],
            purses: [],
            categories: [],
            auth: props.authValue,
            language: 'rus'
        };

        this.funcs = {
            setLanguage: this.setLanguage,
            getHistory: this.getHistory,
            getPurses: this.getPurses,
            getUserCategories: this.getUserCategories,
            addPurse: this.addPurse,
            addCategory: this.addCategory,
            addHistoryRow: this.addHistoryRow,
            addPeople: this.addPeople
        };

        window.cc = this;
    }


    addHistoryRow = async ({amount, category, purse, comment}) => {
        const balance = this.state.purses.filter(el=>el.id === purse)[0].balance;
        const response = await makeHttpRequest({
            method: "post",
            path: `/history-rows/add`,
            data: {amount: +amount, category, purse, comment, balance}
        });
        const normalizedResponse = {...response, date: new Date(Date.parse(response.date))};
        this.setState({history: [...this.state.history, normalizedResponse]});
    };

    getHistory = async () => {
        const user = this.state.auth.getUser();
        if (!user) return;
        const response = await makeHttpRequest({
            method: "get",
            path: `/history-rows/getByUser?id=${user.id}`,
        });
        const normalizedResponse = response.map(el=>({...el,date: new Date(Date.parse(el.date))}));
        this.setState({history: normalizedResponse});
    };

    getPurses = async () =>{
        const user = this.state.auth.getUser();

        if (!user) return;
        const purses = await makeHttpRequest({
            method: "post",
            path: `/purses/getByLogin`,
            data: {login: user.login}
        });
        console.log(purses);
        this.setState({purses});
    };

    getUserCategories = async userId => {
        const cats = await makeHttpRequest({
            method: "get",
            path: `/user-categories/getById?=${userId}`
        });
        this.setState({categories: cats})
    };

    addPurse = async ({purse, amount}) => {
        const user = this.state.auth.getUser();
        if (!user) return;
        console.log({user: user.id, name: purse, balance: +amount});
        const response = await makeHttpRequest({
            method: "post",
            path: `/purses/add`,
            data: {user: user.id, name: purse, balance: +amount}
        });
        this.getPurses();
    };

    addCategory = async ({purse,category}) => {
        if (purse) {
            const cats = await makeHttpRequest({
                method: "post",
                path: `/purses-categories/add`,
                data: {purse, category}
            });
            this.getPurses();
        } else {
            const user = this.state.auth.getUser();
            if (!user) return;
            const cats = await makeHttpRequest({
                method: "post",
                path: `/user-categories//add`,
                data: {user: user.id, category}
            });
            this.getUserCategories(user.id);
        }
    };

    addPeople = async ({purse, login}) => {
        const resp = await makeHttpRequest({
            method: "post",
            path: `/purse-owners/add`,
            data: {user:login, purse}
        });
        this.getPurses();
    };

    setLanguage = language => this.setState({language});

    render() {
        return (
            <ContentContext.Provider value={{ ...this.state, ...this.funcs }}>
                {this.props.children}
            </ContentContext.Provider>
        );
    }
}

export default function Container(props) {
    return <AuthContext.Consumer>{value => <ContextContainer authValue={value} {...props}/>}</AuthContext.Consumer>;
}

export {ContentContext};
