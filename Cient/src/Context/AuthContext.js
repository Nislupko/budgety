import React from 'react';
import bindFunctions from '../Helpers/bindFunctions'
import makeHttpRequest from '../Helpers/http/makeHttpRequest';

export const AuthContext = React.createContext();

export default class AuthContextContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null
        };

        this.funcs = bindFunctions(this, {
            setUser: this.setUser,
            getUser: this.getUser,
            login: this.login,
            logout: this.logout,
            register: this.register
        });
    }

    setUser = user => {
        this.setState({user});
    };

    getUser = () => {
        return this.state.user;
    };

    logout = async () => {
        this.setState({user: null});
    };

    register = async ({newLogin, newPassword, newEmail}) => {
        const dataSend ={ login: newLogin, password:newPassword, email: newEmail };

        const result = await makeHttpRequest({
            method: "post",
            path: "/users/register",
            data: dataSend
        });
    };

    async login({ login, password }) {
        const dataSend = {login: login, password: password};

        const result = await makeHttpRequest({
            method: "post",
            path: "/users/login",
            data: dataSend
        });
        this.setUser(result);
    }

    render() {
        return (
            <AuthContext.Provider value={{ ...this.state, ...this.funcs }}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}
