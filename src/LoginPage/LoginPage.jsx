import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.logout();

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        if (username && password) {
            this.props.login(username, password);
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <div style={{display:"flex"}} >
                <div style={{flex:"1"}}><img src ="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&dl=sean-o-KMn4VEeEPR8-unsplash.jpg" style={{width:"100%",height:"600px",float:"left"}} /></div>

            <div col-md-6 col-md-offset-3 style={{float:"right",marginLeft:"100px",marginTop:"100px"}} >
                <br/>
                <h3 style={{textAlign:"center"}}>Welcome Back!</h3>
                <h4 style={{textAlign:"center"}}>Please login to your account.</h4>
                <br/>
                <br/>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                        {submitted && !username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div style={{marginLeft:"160px"}}>
                        <Link to="/register" className="btn btn-link">Register</Link>
                        </div>
                    <div className="form-group">
                        <button className="btn btn-primary btn-block">Login</button>
                      
                    </div>
                    <div style={{marginTop:"110px"}}>
                        <p style={{fontSize:"15px",textAlign:"center"}}>Terms of use. Privacy policy </p>
                    </div>
                </form>
            </div>
            </div>
        );
    }
}

function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export { connectedLoginPage as LoginPage };