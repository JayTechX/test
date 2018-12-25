import React, {Component} from 'react'
import {NavLink} from "react-router-dom";
import playlist from './assets/svg/playlist.svg'
import play from './assets/svg/play.svg'
import enter from './assets/svg/enter.svg'
import notes from './assets/svg/notes.svg'
import exit from './assets/svg/exit.svg'
import user from './assets/svg/user.svg'
import karaoke from './assets/svg/karaoke.svg'


class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <div className="sidebar">
                    <p className='sidebar-title'>Library</p>
                    <NavLink exact to="/"><img alt={'playlist'} className={'nav-image'} height='20' width='20' src={karaoke}/><span>Home</span></NavLink>
                    <NavLink to="/songs/"><img alt={'playlist'} className={'nav-image'} height='20' width='20' src={play}/><span>Songs</span></NavLink>
                    <NavLink to="/playlist/"><img alt={'playlist'} className={'nav-image'} height='20' width='20'
                                                  src={playlist}/><span>Playlist</span></NavLink>
                    <p className='d-none d-md-block d-lg-block sidebar-title account'>Accounts</p>
                    {
                        this.props.user !== '' ?
                            <div>
                                <NavLink to="#"><img alt={'user'} className={'nav-image'} height='20' width='20'
                                                     src={user}/><span className={'username'}>{this.props.user}</span></NavLink>
                                <a href='#' onClick={this.props.logout}> <img alt={'exit'} className={'nav-image'} height='20' width='20'
                                                                              src={exit}/><span>Logout</span></a>
                            </div>

                            : <div>
                                <NavLink to="/login/"><img alt={'playlist'} className={'nav-image'} height='20' width='20' src={enter}/><span>Login</span></NavLink>
                                <NavLink to="/register/"><img alt={'playlist'} className={'nav-image'} height='20' width='20'
                                                              src={notes}/><span>Register</span></NavLink>
                            </div>
                    }

                    <p className='d-none d-md-block d-lg-block sidebar-title copy text-center'>2018 MusicMaxx &copy; All right reserved</p>
                </div>
            </div>
        )
    }
}


export default Navbar