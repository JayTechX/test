import React, {Component} from 'react';
import './App.css';
import Navbar from "./navbar";
import {BrowserRouter as Router, Route} from "react-router-dom"
import Song from "./songs";
import Playlist from "./playlist";
import Home from "./home";
import Player from "./player";
import Detail from "./detail";
import Login from "./login";
import Register from "./register";
import {app} from './settings';
import PlaylistDetail from "./playlist_detail";
import CreatePlaylist from "./create_playlist";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logged_in: !!localStorage.getItem('token'),
            username: '',
            user_id: '',
            songs: [],
            is_loading: true,
            is_playing: false,
            now_playing: {},
            next_play: {},
            login_redirect: false,
            play_from: '',

        };

        this.stopLoading = this.stopLoading.bind(this);
        this.setNowPlaying = this.setNowPlaying.bind(this);
        this.setPlay = this.setPlay.bind(this);
        this.setCurrentSong = this.setCurrentSong.bind(this);
        this.getNextPlay = this.getNextPlay.bind(this);
        this.getPreviousPlay = this.getPreviousPlay.bind(this);
        this.addToQueue = this.addToQueue.bind(this);
    }

    addToQueue(song) {
        let presentState = this.state.songs;
        let instance = this.state.songs.indexOf(this.state.now_playing);
        presentState.splice(instance + 1, 0, song);
        // this.setState({songs: presentState});
        this.setState(prevState => ({
            songs: [...prevState.songs].splice(instance + 1, 0, song)
        }))
    }

    handle_login = (e, data) => {
        e.preventDefault();
        fetch(`${app.BASE_URL}token-auth/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(json => {
                localStorage.setItem('token', json.token);
                localStorage.setItem('id', json.user.id);
                this.setState({
                    logged_in: true,
                    username: json.user.username,
                    user_id: json.user.id,
                    login_redirect: true,
                });
            });
    };

    handle_signup = (e, data) => {
        e.preventDefault();
        fetch(`${app.BASE_URL}users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(json => {
                localStorage.setItem('token', json.token);
                localStorage.setItem('id', json.id);
                this.setState({
                    logged_in: true,
                    username: json.username,
                    user_id: json.id,
                });
            });
    };

    handle_logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        this.setState({logged_in: false, username: '', user_id: '', login_redirect: false});
    };


    componentDidMount() {
        if (this.state.logged_in) {
            fetch(`${app.BASE_URL}current_user/`, {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            })
                .then(res => res.json())
                .then(json => {
                    localStorage.setItem('id', json.id);
                    this.setState({username: json.username, user_id: json.id});
                });
        }
    }

    setNowPlaying(now_playing, play_from) {

        if (this.state.songs.indexOf(now_playing) === 0) {
            this.setState({next_play: this.state.songs[1]})
        } else {
            this.setState({next_play: this.state.songs[0]})
        }

        this.setState({now_playing: now_playing, is_playing: true, play_from: play_from});

    }

    getNextPlay() {
        let instance = this.state.songs.indexOf(this.state.now_playing);

        if (this.state.songs[this.state.songs.length - 1] === this.state.now_playing) {
            return
        }
        this.setState({now_playing: this.state.songs[instance + 1]})
    }

    getPreviousPlay() {
        let instance = this.state.songs.indexOf(this.state.now_playing);

        if (this.state.songs[0] === this.state.now_playing) {
            return
        }
        this.setState({now_playing: this.state.songs[instance - 1]})

    }


    stopLoading() {
        this.setState({is_loading: false})
    }

    setPlay() {
        this.setState({is_playing: !this.state.is_playing});
    };


    setCurrentSong(songs) {
        this.setState({songs})
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <Navbar logout={this.handle_logout} user={this.state.username}/>
                    <div className={'content'}>
                        <Route exact path="/" render={(props) => <Home {...props} />}/>
                        <Route path="/songs/"
                               render={(props) => <Song {...props} user_id={this.state.user_id} now_playing={this.setNowPlaying} add_queue={this.addToQueue}
                                                        set_current={this.setCurrentSong}/>}/>
                        <Route path="/login/" render={(props) => <Login {...props} handle_login={this.handle_login} login_state={this.state.login_redirect}/>}/>
                        <Route path="/register/" render={(props) => <Register {...props} handle_signup={this.handle_signup}/>}/>
                        <Route path="/detail/"
                               render={(props) => <Detail  {...props} add_queue={this.addToQueue}
                                                           is_loading={this.state.is_loading} now_playing={this.setNowPlaying}
                                                           set_current={this.setCurrentSong}
                               />}/>
                        <Route path="/playlist/" render={(props) => <Playlist {...props} now_playing={this.setNowPlaying}/>}/>
                        <Route path="/playlist_create/" component={CreatePlaylist}/>
                        <Route path="/playlist_detail/:id"
                               render={(props) => <PlaylistDetail {...props} now_playing={this.setNowPlaying} add_queue={this.addToQueue}
                                                                  set_current={this.setCurrentSong}/>}/>
                    </div>
                    <Player song={this.state.now_playing} is_playing={this.state.is_playing} set_play={this.setPlay}
                            play_location={this.state.play_from} next_play={this.getNextPlay} previous_song={this.getPreviousPlay}/>
                </div>
            </Router>
        );
    }
}

export default App;
