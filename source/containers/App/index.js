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
    render() {
        return (
            <Catcher>
                <Provider value = { options }>
                    <StatusBar />
                    <Switch>
                        <Route
                            component = { Login }
                            path = '/login'
                        />
                        <Route
                            component = { Feed }
                            path = '/feed'
                        />
                        <Route
                            component = { Profile }
                            path = '/profile'
                        />
                        <Redirect to = '/login' />
                    </Switch>
                </Provider>
            </Catcher>
        );
    }
}
