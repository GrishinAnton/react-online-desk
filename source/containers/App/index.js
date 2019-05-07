// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route, Redirect } from 'react-router-dom';

// Components
import Catcher from '../../components/Catcher';
import Feed from '../../components/Feed';
import Profile from '../../components/Profile';
import Login from '../../components/Login';
import { Provider } from '../../components/HOC/withProfile';
import StatusBar from '../../components/StatusBar';

// Instruments
import avatar from '../../theme/assets/lisa.png';

const options = {
    avatar,
    currentUserFirstName: 'Антон',
    currentUserLastName:  'Гришин',
};

@hot(module)
export default class App extends Component {
    state = {
        isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated')),
    }


    _loginToggle = (state) => {
        this.setState({
            isAuthenticated: state,
        });

        localStorage.setItem('isAuthenticated', state);
    }


    render() {
        const { isAuthenticated } = this.state;

        return (
            <Catcher>
                <Provider value = { options }>
                    <StatusBar loginFail = { this._loginToggle } />
                    <Switch>
                        <Route
                            path = '/login'
                            render = { (props) => (
                                <Login
                                    loginSuccess = { this._loginToggle }
                                    { ...props }
                                />
                            ) }
                        />

                        {!isAuthenticated && <Redirect to = '/login' />}

                        <Route
                            component = { Feed }
                            path = '/feed'
                        />
                        <Route
                            component = { Profile }
                            path = '/profile'
                        />

                        <Redirect to = '/feed' />
                    </Switch>
                </Provider>
            </Catcher>
        );
    }
}
