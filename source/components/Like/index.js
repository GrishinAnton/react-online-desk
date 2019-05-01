// Core
import React, { Component } from 'react';
import { string, func, arrayOf, shape } from 'prop-types';
import cx from 'classnames';

// Instruments
import Styles from './styles.m.css';

// Components
import { withProfile } from '../HOC/withProfile';

@withProfile
export default class Like extends Component {
    static propTypes = {
        _likePost: func.isRequired,
        id:        string.isRequired,
        likes:     arrayOf(
            shape({
                id:        string.isRequired,
                firstName: string.isRequired,
                lastName:  string.isRequired,
            }),
        ).isRequired,
    };

    // componentDidMount() {
    //     console.log(this.props.likes);
    // }

    state = {
        showLikers: false,
    };

    _showLikers = () => {
        this.setState({
            showLikers: true,
        });
    };

    _hideLikers = () => {
        this.setState({
            showLikers: false,
        });
    };

    _likePost = () => {
        const { _likePost, id } = this.props;

        _likePost(id);
    };

    _getLikedByMe = () => {
        const { currentUserFirstName, currentUserLastName, likes } = this.props;

        return likes.some(({ firstName, lastName }) => {
            return `${firstName} ${lastName}` === `${currentUserFirstName} ${currentUserLastName}`;
        });
    };

    _getLikeStyles = () => {
        const likeByMe = this._getLikedByMe();

        return cx(Styles.icon, {
            [ Styles.liked ]: likeByMe,
        });
    };

    _getLikersList = () => {
        const { showLikers } = this.state;
        const { likes } = this.props;

        // console.log(likes);

        const likesJSX = likes.map(({ firstName, lastName, id }) => {
            return <li key = { id }>{`${firstName} ${lastName}`}</li>;
        });

        // console.log(likes.length);
        // console.log(showLikers);

        return likes.length && showLikers ? <ul>{likesJSX}</ul> : null;
    };

    _getLikesDescription = () => {
        const { likes, currentUserFirstName, currentUserLastName } = this.props;

        const likedByMe = this._getLikedByMe();

        if (likes.length === 1 && likedByMe) {
            return `${currentUserFirstName} ${currentUserLastName}`;
        } else if (likes.length === 2 && likedByMe) {
            return `You and ${likes.length - 1} other`;
        } else if (likedByMe) {
            return `You and ${likes.length - 1} other`;
        }
    };

    render() {
        const likeStyles = this._getLikeStyles();
        const likersList = this._getLikersList();
        const likesDescription = this._getLikesDescription();

        const { likes } = this.props;

        return (
            <section className = { Styles.like }>
                <span
                    className = { likeStyles }
                    onClick = { this._likePost }>
                    Like
                </span>

                <div>
                    {likersList} {likes.length}
                    <span
                        onMouseEnter = { this._showLikers }
                        onMouseLeave = { this._hideLikers }>
                        &nbsp;{likesDescription}
                    </span>
                </div>
            </section>
        );
    }
}
