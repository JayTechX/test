import React, {Component} from 'react';
import options_two from '../assets/svg/options_two.svg';
import axios from "axios/index";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


class SongRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: true,
        };
        this.addToQueue = this.addToQueue.bind(this)
    }

    static clean(str) {
        let cleaned = str.replace(/vevo/gi, '');
        return cleaned.replace(/official/gi, '');
    }

    more_options(option, e) {
        e.stopPropagation();
        this.setState({hidden: !this.state.hidden});
    }

    showModal(data) {
        this.props.show_modal(data);
        this.props.get_playlist();
        this.setState({hidden: !this.state.hidden});
    }

    playlist_song(song) {
        this.setState({hidden: true});
        let data = new FormData();
        data.set('song_title', song.snippet.title);
        data.set('song_description', song.snippet.description);
        data.set('video_id', song.videoId);
        data.set('stream_url', song.audio_file);
        data.set('image_url', song.snippet.thumbnails.high.url);
        data.set('channel_url', song.snippet.channelId);
        data.set('channel_title', song.snippet.channelTitle);
        data.set('playlist', '2');

        axios.post(`http://127.0.0.1:8000/playlist_songs/2/`, data, {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                let response = res.data;
                toast(response.song_title + ' saved successfully');
            })
    }

    saved_song(song) {
        this.setState({hidden: true});
        let data = new FormData();
        data.set('song_title', song.snippet.title);
        data.set('song_description', song.snippet.description);
        data.set('video_id', song.videoId.videoId);
        data.set('stream_url', song.audio_file);
        data.set('image_url', song.snippet.thumbnails.high.url);
        data.set('channel_url', song.snippet.channelId);
        data.set('channel_title', song.snippet.channelTitle);

        axios.post(`http://127.0.0.1:8000/saved_songs/`, data, {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                let response = res.data;
                toast(response.song_title + ' saved successfully');
            })
    }

    remove_song(song, id) {
        this.setState({hidden: true});
        axios.delete(`http://127.0.0.1:8000/remove_saved/${id}/`, {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                this.props.remove_song_adapt(song);
            })
    }

    setPlaying(now_playing, play_from) {
        this.props.set_current(this.props.current_list);
        this.props.now_playing(now_playing, play_from)
    }

    addToQueue(song) {
        this.setState({hidden: true});
        this.props.add_queue(song)
    }

    render() {
        return (
            <div>
                <div className={'song-row'} onClick={() => this.setPlaying(this.props.playing, this.props.play_from)}
                     key={this.props.playing.videoId.videoId}>
                    <div className={'row'}>
                        <div className={'col-md-1 col-sm-2 col-xs-2 col-lg-1'}>
                            <img alt={this.props.playing.snippet.title} width={'80'} height={'80'} src={this.props.playing.snippet.thumbnails.high.url}/>
                        </div>
                        <div className='col-md-11 col-sm-10 col-xs-10 col-lg-11 song-row-body'>
                            <p className={'detail-music-name'}>{SongRow.clean(this.props.playing.snippet.title)}</p>
                            <p className={'detail-music-artist'}>{SongRow.clean(this.props.playing.snippet.channelTitle)}</p>
                            <p className={'detail-music-song'}>Song</p>
                            <div className={'option_container'} onClick={(e) => this.more_options(this.props.playing.snippet.title, e)}>
                                <img alt={'more options'} className={'options'}
                                     src={options_two}/>
                            </div>


                        </div>
                    </div>
                </div>
                <div className={'option_list_container'}>
                    <div className={'row'}>
                        <div className={'col-md-1'}/>
                        <div className={'col-md-11'}>
                            {
                                this.state.hidden ? '' : <div className={'option_list'}>
                                    <p onClick={() => this.addToQueue(this.props.playing)}>Add to Queue</p>
                                    <p>Go to Artist</p>
                                    <p onClick={() => this.showModal(this.props.playing)}>Add to Playlist</p>
                                    {this.props.adapt ?
                                        <p onClick={() => this.remove_song(this.props.playing, this.props.adapt_id)}>Remove from Saved Song</p> :
                                        <p onClick={() => this.saved_song(this.props.playing)}>Add to Saved Song</p>}

                                </div>
                            }
                        </div>
                    </div>
                </div>
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

export default SongRow