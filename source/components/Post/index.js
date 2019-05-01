//Core
import React, { Component } from 'react';
import moment from 'moment';
import { func, string, number, array } from 'prop-types';

// Components
import Like from '../Like';
import { withProfile } from '../HOC/withProfile';


// Instruments
import Styles from './styles.m.css';

@withProfile
export default class Post extends Component {
    static propTypes = {
        id:          string.isRequired,
        comment:     string.isRequired,
        created:     number.isRequired,
        _likePost:   func.isRequired,
        likes:       array.isRequired,
        _removePost: func.isRequired,
    }

    _getCross = (id) => {
        const { firstName, lastName, currentUserFirstName, currentUserLastName } = this.props;

        return `${firstName} ${lastName}` === `${currentUserFirstName} ${currentUserLastName}` ? (
            <span
                className = { Styles.cross }
                onClick = { () => this.props._removePost(id) }>
            </span>)
            : null;
    }

    render () {
        const {
            comment,
            created,
            _likePost,
            id,
            likes,
            avatar,
            firstName,
            lastName,
        } = this.props;

        const cross = this._getCross;

        return (
            <section className = { Styles.post }>
                { cross(id) }
                <img src = { avatar } />
                <a>{`${firstName} ${lastName}` }</a>
                <time>
                    {
                        moment.unix(created).format('MMMM D h:mm:ss a')
                    }
                </time>
                <p>{ comment }</p>
                <Like
                    _likePost = { _likePost }
                    id = { id }
                    likes = { likes }
                />
            </section>
        );
    }
}
