import React, {Component} from 'react'
import axios from 'axios';
import {app} from './settings';
import Link from "react-router-dom/es/Link";

class Playlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlist: []
        }
    }

    componentDidMount() {
        axios.get(`${app.BASE_URL}playlist`, {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                const playlist = res.data;
                this.setState({playlist})
            });

    }


    render() {
        return (
            <div className={'app-container'}>
                <div className={'row'}>
                    <div className={'col-md-6'}>
                        <p className='app-menu-name'>My Playlists</p>
                        <h2 className={'result-text'}>Sit Back And Enjoy</h2>
                        <Link to={'/playlist_create/'}>Create New Playlist</Link>
                        <div className={'playlist-container play_row'}>

                            {this.state.playlist.map(el => {
                                return (

                                    <Link to={`/playlist_detail/${el.id}`} key={el.id}>
                                        <div className={'row'}>
                                            <div className={'col-md-10 playlist-box'}>
                                                <p className={'playlist_link'}>{el.name}</p>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Playlist