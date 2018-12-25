import React, {Component} from 'react';
import axios from 'axios';
import {app} from "./settings";
import SongRow from "./components/SongRow";
import {ToastContainer, toast} from 'react-toastify';
import {Link} from "react-router-dom";

class PlaylistDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            songs: [],
            modal_shown: false,
            playlist_loading: false,
            playlist: [],
            playlist_selected_song: [],
        };

        this.modal = React.createRef();
        this.closeModal = this.closeModal.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        this.getPlaylist = this.getPlaylist.bind(this);
    }


    closeModal() {
        this.setState({modal_shown: false})
    }

    showModal(data) {
        this.setState({modal_shown: true, playlist_selected_song: data})
    }

    handleOutsideClick(e) {
        if (e.target === this.modal.current) {
            this.closeModal();
        }
    }

    getPlaylist() {
        this.setState({playlist_loading: true});
        axios.get(`${app.BASE_URL}playlist/`, {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                const playlist = res.data;
                this.setState({playlist});
                this.setState({playlist_loading: false});
            });
    }


    componentDidMount() {
        axios.get(`${app.BASE_URL}playlist_songs/${this.props.match.params.id}/`, {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                const songs = res.data;
                let song_box = [];

                songs.map(el => {
                    let song_instance = {};
                    song_instance['audio_file'] = el.stream_url;

                    song_instance['videoId'] = {};
                    song_instance['videoId']['videoId'] = el.video_id;
                    song_instance['snippet'] = {};
                    song_instance['snippet']['channelTitle'] = el.channel_title;
                    song_instance['snippet']['title'] = el.song_title;
                    song_instance['snippet']['channelId'] = el.channel_url;
                    song_instance['snippet']['thumbnails'] = {};
                    song_instance['snippet']['thumbnails']['high'] = {};
                    song_instance['snippet']['thumbnails']['high']['url'] = el.image_url;
                    song_box.push(song_instance);
                });
                this.setState({songs: song_box})
            });
        document.addEventListener('click', this.handleOutsideClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleOutsideClick, false);
    }

    handlePlaylistClick(song, playlist) {
        let data = new FormData();
        data.set('song_title', song.snippet.title);
        data.set('song_description', song.snippet.description);
        data.set('video_id', song.videoId.videoId);
        data.set('stream_url', song.audio_file);
        data.set('image_url', song.snippet.thumbnails.high.url);
        data.set('channel_url', song.snippet.channelId);
        data.set('channel_title', song.snippet.channelTitle);
        data.set('playlist', playlist);

        axios.post(`http://127.0.0.1:8000/playlist_songs/${playlist}/`, data, {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                this.closeModal();
                let response = res.data;
                toast(response.song_title + ' has been added to playlist');
            })

    }

    render() {
        return (
            <div className={'app-container'}>

                <p className='app-menu-name'>My Playlists</p>
                <h2 className={'result-text'}>Sit Back And Enjoy</h2>

                <div className={'song-container'}>

                    {this.state.modal_shown ? <div id="myModal" className="modal-max" ref={this.modal}>
                        <div className="modal-content-max">
                            <div className="modal-header-max">
                                <span className="close" onClick={() => this.closeModal()}>&times;</span>
                                <h2>Select Playlist</h2>
                            </div>
                            <div className="modal-body-max">
                                {this.state.playlist_loading ? <div className="lds-ring">
                                        <div/>
                                        <div/>
                                        <div/>
                                        <div/>
                                    </div> :
                                    this.state.playlist.map(el => {
                                        return (
                                            <p key={el.id}
                                               onClick={() => this.handlePlaylistClick(this.state.playlist_selected_song, el.id)}>{el.name}</p>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div> : ''}

                    {typeof this.state.songs !== 'undefined' && this.state.songs.length > 0 ?

                        this.state.songs.map(el => {
                            return (
                                <SongRow playing={el} now_playing={this.props.now_playing} play_from={'detail'} close_modal={this.closeModal}
                                         get_playlist={this.getPlaylist}
                                         show_modal={this.showModal} set_current={this.props.set_current} current_list={this.state.songs} add_queue={this.props.add_queue}/>
                            )
                        }) : <p>There are no songs here <Link to={'/songs/'}>Add songs to Playlist</Link></p>
                    }</div>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable
                    pauseOnHover>
                </ToastContainer>

            </div>
        )
    }
}

export default PlaylistDetail