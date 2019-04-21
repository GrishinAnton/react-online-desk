//Core
import React, { Component } from 'react';
import { Transition } from 'react-transition-group';
import { fromTo } from 'gsap';

// Components
import Catcher from '../../components/Catcher';
import StatusBar from '../StatusBar';
import Composer from '../Composer';
import Post from '../Post';
import Spinner from '../Spinner';
import { withProfile } from '../HOC/withProfile';
import Postman from '../Postman';

// Instruments
import Styles from './styles.m.css';
import { api, TOKEN, GROUP_ID } from '../../config/api';
import { socket } from '../../socket/init';

@withProfile
export default class Feed extends Component {
    state = {
        posts: [
            { id: '123', comment: 'Hi there!', created: 1554818505750, likes: []},
            { id: '456', comment: 'Hi', created: 1554818505752, likes: []},
        ],
        isPostFetching: false,
    }

    componentDidMount () {
        const { currentUserFirstName, currentUserLastName } = this.props;

        this._fetchPosts();

        socket.emit('join', GROUP_ID);

        socket.on('create', (postJSON) => {
            const { data: createdPost, meta } = JSON.parse(postJSON);

            if (`${currentUserFirstName} ${currentUserLastName}` !== `${meta.authorFirstName} ${meta.authorLastName}`) {
                this.setState(({ posts }) => ({
                    posts: [ createdPost, ...posts ],
                }));
            }
        });

        socket.on('remove', (postJSON) => {
            const { data: removedPost, meta } = JSON.parse(postJSON);

            if (`${currentUserFirstName} ${currentUserLastName}` !== `${meta.authorFirstName} ${meta.authorLastName}`) {
                this.setState(({ posts }) => ({
                    posts: posts.filter((post) => post.id !== removedPost.id),
                }));
            }
        });

        socket.on('like', (postJSON) => {
            const { data: likePost } = JSON.parse(postJSON);

            if (`${currentUserFirstName} ${currentUserLastName}` !== `${likePost.firstName} ${likePost.lastName}`) {
                this.setState(({ posts }) => ({
                    posts: posts.map((post) => post.id === likePost.id ? likePost : post),
                }));
            }
        });
    }

    componentWillUnmount () {
        socket.removeListener('create');
        socket.removeListener('remove');
        socket.removeListener('like');
    }

    _setPostFetchingState = (state) => {
        this.setState({
            isPostFetching: state,
        });
    }

    _fetchPosts = async () => {
        this._setPostFetchingState(true);

        const response = await fetch(api, {
            method: 'GET',
        });

        const { data: posts } = await response.json();

        this.setState({
            posts,
            isPostFetching: false,
        });
    }

    _createPost = async (comment) => {
        this._setPostFetchingState(true);

        const response = await fetch(api, {
            method:  'POST',
            headers: {
                'Content-type': 'application/json',
                Authorization:  TOKEN,
            },
            body: JSON.stringify({comment}),
        });

        const { data: post } = await response.json();


        this.setState(({ posts }) => ({
            posts:          [ post, ...posts ],
            isPostFetching: false,
        }));
    }

    _likePost = async (id) => {
        this._setPostFetchingState(true);

        const response = await fetch(`${api}/${id}`, {
            method:  'PUT',
            headers: {
                Authorization: TOKEN,
            },
        });

        const { data: likePost } = await response.json();

        this.setState(({ posts }) => ({
            posts:          posts.map((post) => post.id === likePost.id ? likePost : post),
            isPostFetching: false,
        }));
    }

    _removePost = async (id) => {
        this._setPostFetchingState(true);

        await fetch(`${api}/${id}`, {
            method:  'DELETE',
            headers: {
                Authorization: TOKEN,
            },
        });


        this.setState(({ posts }) => ({
            posts:          posts.filter((post) => post.id !== id),
            isPostFetching: false,
        }));
    }

    _animateComoposerEnter = (composer) => {
        fromTo(composer, 1, { opacity: 0 }, { opacity: 1 });
    }

    render () {
        const { posts, isPostFetching } = this.state;

        const postsJSX = posts.map((post) => {
            return (
                <Catcher key = { post.id }>
                    <Post
                        key = { post.id }
                        { ...post }
                        _likePost = { this._likePost }
                        _removePost = { this._removePost }
                    />
                </Catcher>
            );
        });

        return (
            <section className = { Styles.feed }>
                <Spinner isSpinning = { isPostFetching } />
                <StatusBar/>
                <Transition
                    appear
                    in
                    timeout = { 1000 }
                    onEnter = { this._animateComoposerEnter }>
                    <Composer _createPost = { this._createPost } />
                </Transition>
                <Postman></Postman>
                { postsJSX }
            </section>
        );
    }
}
