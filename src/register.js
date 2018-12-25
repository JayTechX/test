import React, {Component} from 'react';

class Register extends Component {
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
        return (
            <div className={'app-container'}>
                <div className={'row'}>
                    <div className={'col-md-6'}>
                        <p className='app-menu-name'>Accounts</p>
                        <h2 className={'result-text'}>Register Today For An Amazing Experience</h2>
                        <div className={'form-container'}>
                            <form onSubmit={e => this.props.handle_signup(e, this.state)}>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input className="form-control"
                                           type="text"
                                           name="username"
                                           value={this.state.username}
                                           onChange={this.handle_change}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        className="form-control"
                                        type="password"
                                        name="password"
                                        value={this.state.password} autoComplete="current-password"
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

export default Register