//Core
import React, { Component } from 'react';
import moment from 'moment';
import { func, string, number, array } from 'prop-types';

// Components
import { Consumer } from '../HOC/withProfile';
import Like from '../Like';

// Instruments
import Styles from './styles.m.css';

export default class Post extends Component {
    static propTypes = {
        id:          string.isRequired,
        comment:     string.isRequired,
        created:     number.isRequired,
        _likePost:   func.isRequired,
        likes:       array.isRequired,
        _removePost: func.isRequired,
    }

    render () {
        const { comment, created, _likePost, id, likes, _removePost } = this.props;

        return (
            <Consumer>
                {(context) => (
                    <section className = { Styles.post }>
                        <span
                            className = { Styles.cross }
                            onClick = { () => _removePost(id) }>
                        </span>
                        <img src = { context.avatar } />
                        <a>{ `${context.currentUserFirstName} ${context.currentUserLastName}` }</a>
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
                            { ...context }
                        />
                    </section>
                )}
            </Consumer>
        );
    }
}
