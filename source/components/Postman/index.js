// Core
import React from 'react';
import { Transition } from 'react-transition-group';
import { fromTo } from 'gsap';

// Instruments
import Styles from './styles.m.css';
import { withProfile } from '../HOC/withProfile';

const Postman = (props) => {
    const _animatePostmanEnter = (postman) => {
        fromTo(postman, 1, { opacity: 0 }, { opacity: 1 });
    };
    const _animatePostmanEntered = (postman) => {
        fromTo(postman, 1, { opacity: 1 }, { opacity: 0 });
    };

    return (
        <Transition
            appear
            in
            timeout = { 1000 }
            onEnter = { _animatePostmanEnter }
            onEntered = { _animatePostmanEntered }>
            <section className = { Styles.postman }>
                <img src = { props.avatar } />
                <span>Welcome online, {props.currentUserFirstName}</span>
            </section>
        </Transition>
    );
};

export default withProfile(Postman);
