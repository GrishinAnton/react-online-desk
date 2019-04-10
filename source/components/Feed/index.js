//Core
import React, { Component } from 'react';
import moment from 'moment';

// Components
import StatusBar from '../StatusBar';
import Composer from '../Composer';
import Post from '../Post';
import Spinner from '../Spinner';

// Instruments
import Styles from './styles.m.css';
import { getUniqueID, delay } from '../../instruments';

export default class Feed extends Component {
    constructor () {
        super();

        this._createPost = this._createPost.bind(this);
        this._setPostFetchingState = this._setPostFetchingState.bind(this);
        this._likePost = this._likePost.bind(this);
        this._removePost = this._removePost.bind(this);
    }

    state = {
        posts: [
            { id: '123', comment: 'Hi there!', created: 1554818505750, likes: []},
            { id: '456', comment: 'Hi', created: 1554818505752, likes: []},
        ],
        isPostFetching: false,
    }

    _setPostFetchingState (state) {
        this.setState({
            isPostFetching: state,
        });
    }

    async _createPost (comment) {
        this._setPostFetchingState(true);
        const post = {
            id:      getUniqueID(),
            created: moment.now(),
            comment,
            likes:   [],
        };

        await delay(2000);

        this.setState(({ posts }) => ({
            posts:          [ post, ...posts ],
            isPostFetching: false,
        }));
    }

    async _likePost (id) {
        const { currentUserFirstName, currentUserLastName } = this.props;

        this._setPostFetchingState(true);

        await delay(2000);

        const newPost = this.state.posts.map((post) => {
            if (id === post.id) {
                return {
                    ...post,
                    likes: [
                        {
                            id:        getUniqueID(),
                            firstName: currentUserFirstName,
                            lastName:  currentUserLastName,
                        },
                    ],
                };
            }

            return post;
        });

        this.setState({
            posts:          newPost,
            isPostFetching: false,
        });
    }

    _removePost (id) {
        const posts = this.state.posts.filter((post) => {
            return id !== post.id;
        });


        this.setState({
            posts: posts,
        });
    }

    render () {
        const { posts, isPostFetching } = this.state;

        const postsJSX = posts.map((post) => {
            return (
                <Post
                    key = { post.id }
                    { ...post }
                    _likePost = { this._likePost }
                    _removePost = { this._removePost }
                />
            );
        });

        return (
            <section className = { Styles.feed }>
                <Spinner isSpinning = { isPostFetching } />
                <StatusBar/>
                <Composer _createPost = { this._createPost } />
                { postsJSX }
            </section>
        );
    }
}
