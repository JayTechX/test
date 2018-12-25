import React, {Component} from 'react';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.props.form_attribute.map(el => {
            this.state[el.name] = '';
        });
    }

    submitForm(e) {
        e.preventDefault();
        this.props.submitAction(this.state)
    }

    render() {
        return (
            <div className={'col-md-6'}>
                <div className={'form-container'}>
                    <form onSubmit={e => this.submitForm(e)}>
                        {
                            this.props.form_attribute.map(el => {
                                if (el.type === 'textarea') {
                                    return (
                                        <div className="form-group" key={el.name}>
                                            <label className={'upper'} htmlFor={el.name}>{el.name}</label>
                                            <textarea className="form-control" name={el.name} placeholder={el.placeholder} value={this.state[el.name]}
                                                      onChange={(e) => this.setState({[el.name]: e.target.value})}/>
                                        </div>
                                    )
                                }
                                return (
                                    <div className="form-group" key={el.name}>
                                        <label className={'upper'} htmlFor={el.name}>{el.name}</label>
                                        <input className="form-control" name={el.name} placeholder={el.placeholder} value={this.state[el.name]}
                                               type={el.type}
                                               onChange={(e) => this.setState({[el.name]: e.target.value})}/>
                                    </div>
                                )
                            })
                        }
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        )
    }

}

export default Form