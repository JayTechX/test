import React, {Component} from 'react'
import Form from './components/form';
import axios from 'axios';
import {app} from './settings';
import {Redirect} from "react-router-dom";

class CreatePlaylist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };
        this.submitAction = this.submitAction.bind(this);
    }

    submitAction(state) {
        axios.post(`${app.BASE_URL}playlist/`, state, {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                let response = res.data;
                this.setState({redirect: true})
            });
    }

    render() {
        let redirect = this.state.redirect;
        if (redirect) {
            return <Redirect to={
                {
                    pathname: '/playlist/',
                }
            }/>;
        }

        const formBuilder = [
            {
                name: 'name',
                placeholder: 'Playlist Name',
                type: 'text'
            },
            {
                name: 'description',
                placeholder: 'Description',
                type: 'textarea'
            }
        ];
        return (
            <div className={'app-container'}>
                <div className={'col-md-6'}>
                    <p className='app-menu-name'>Create New Playlist</p>
                    <h2 className={'result-text'}>Make or Break Playlist here</h2>
                </div>
                <Form submitAction={this.submitAction} form_attribute={formBuilder}/>
            </div>
        )
    }
}

export default CreatePlaylist