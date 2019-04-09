//Core
import React, { Component } from 'react';

// Components
import StatusBar from '../StatusBar';
import Composer from '../Composer';
import Post from '../Post';

// Instruments
import Styles from './styles.m.css';

export default class Feed extends Component {
    render () {
        const { avatar, currentUserFirstName } = this.props;

        return (
            <section className = { Styles.feed }>
                <StatusBar { ...this.props }/>
                <Composer
                    avatar = { avatar }
                    currentUserFirstName = { currentUserFirstName }
                />
                <Post { ...this.props }/>
            </section>
        );
    }
}
