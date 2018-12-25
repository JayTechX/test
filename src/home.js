import React, {Component} from 'react'
import {Redirect} from "react-router-dom";


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            redirect: false,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        let input = e.target.value;
        this.setState({input})
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({redirect: true});
    }

    render() {
        const {redirect} = this.state;
        if (redirect) {
            return <Redirect to={
                {
                    pathname: '/detail/',
                    state: {input: this.state.input}
                }
            }/>;
        }
        return (
            <div className={'app-container'}>
                <p className='app-menu-name'>Home</p>
                <h2 className={'result-text'}>Browse & Download Music For Free</h2>
                <h5 className={'musicmaxx-text'}>MusicMaxx gives you instant access to millions of songs – from old favorites to the latest hits. Just hit play
                    to stream anything you
                    like.</h5>

                <form onSubmit={e => this.handleSubmit(e)}>
                    <input type='text' value={this.state.input} onChange={e => this.handleChange(e)} className={'search'} placeholder={'Enter song name'}/>
                </form>
                <p className={'search-phrase'}>Search for songs, artists and genres</p>
            </div>
        )
    }
}

export default Home