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
        enterSuccess: false,
    }

    componentDidMount() {
        const enterSeccess = JSON.parse(localStorage.getItem('enterSuccess'));
        if (enterSeccess) {
            this.setState({
                enterSuccess: enterSeccess,
            });
        }
    }

    _loginToggle = (state) => {
        this.setState({
            enterSuccess: state,
        });

        localStorage.setItem('enterSuccess', state);
    }


    render() {
        const { enterSuccess } = this.state;
        const LoginWrapper = ({component: Component, ...rest}) => (

            <Route
                { ...rest }
                render = { (props) =>(
                    <Component
                        loginSuccess = { this._loginToggle }
                        props = { props }
                    />
                ) }
            />
        );


        return (
            <Catcher>
                <Provider value = { options }>
                    <StatusBar loginFail = { this._loginToggle } />
                    <Switch>
                        <LoginWrapper
                            component = { Login }
                            path = '/login'
                        />

                        {/* <Route
                            component = { Login }
                            func = { enterSuccess }
                            path = '/login'
                        /> */}
                        {
                            enterSuccess && <Route
                                component = { Feed }
                                path = '/feed'
                                            />
                        }
                        {
                            enterSuccess && <Route
                                component = { Profile }
                                path = '/profile'
                            />
                        }

                        <Redirect to = '/login' />
                    </Switch>
                </Provider>
            </Catcher>
        );
    }
}
