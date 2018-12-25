import React, {Component} from 'react';
import {Redirect} from "react-router-dom";

class Login extends Component {
    state = {
        username: '',
        password: ''
    };

    handle_change = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(prevstate => {
            const newState = {...prevstate};
            newState[name] = value;
            return newState;
        });
    };

    render() {
        let redirect = this.props.login_state;
        if (redirect) {
            return <Redirect to={
                {
                    pathname: '/',
                }
            }/>;
        }
        return (
            <div className={'app-container'}>
                <div className={'row'}>
                    <div className={'col-md-6'}>
                        <p className='app-menu-name'>Accounts {this.props.login_state}</p>
                        <h2 className={'result-text'}>Login Today For An Amazing Experience</h2>
                        <div className={'form-container'}>
                            <form onSubmit={e => this.props.handle_login(e, this.state)}>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input className="form-control"
                                           name="username"
                                           value={this.state.username}
                                           onChange={this.handle_change}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input className="form-control"
                                           type="password"
                                           name="password"
                                           value={this.state.password}
                                           onChange={this.handle_change}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
