import React, { Component } from 'react';
import API from '../utils/api';
import MyContext from '../utils/MyContext';


class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            loginPage: true,
            username: '',
            password: '',
            usersList: [],
        }
        console.log(this.props);

    }

    componentDidMount(){
        API.get('users')
            .then(res=> {
                console.log(res);
                this.setState({
                    usersList: res.data
                })
            })
    }
    
    clickLink = (value) => {
        this.setState({
            loginPage: value
        })
    }

    authenticateUser = () =>{
        var flag = false;
        this.state.usersList.forEach((user)=> {
            if(user.username === this.state.username){
                if(user.password === this.state.password){
                    flag = true;
                    this.props.authenticatedUser();
                }
            }
        })

        if(!flag){

            alert("Invalid username or password");
        }
    }

    registerUser = () => {
        API.post('users', {username: this.state.username, password: this.state.password})
            .then(res => {
                if(res.status){
                    this.setState({
                        authenticated : true
                    })
                }
            })
            
    }

    updateUsername = (e) =>{
        this.setState({
            username: e.target.value
        })
    }

    updatePassword = (e) =>{
        this.setState({
            password: e.target.value
        })
    }

    render() {
            if(this.state.loginPage){
                return (
                    <MyContext.Consumer>
                        {context => (
                            <div className="App">
                            <div className="loginDiv">
                                <h2>Login</h2>
                                <pre className="login-label">Username </pre>
                                <input type="text" value={this.state.username} onChange={this.updateUsername}></input>
                                <br></br>
                                <pre className="login-label">Password </pre>
                                <input type="password" value={this.state.password} onChange={this.updatePassword}></input>
                                <br></br>
                                <br></br>
                                <button className="login-button" onClick={context.authenticateUser}>Login</button>
        
                                <div className="instruction">
                                    Don't have an account? <a className="link" onClick={() => this.clickLink(false)}>Sign Up</a>
                                </div>
                            </div>
                        </div>
                        )}
                    </MyContext.Consumer>
                    
                );
            }
            else{
                return (
                    <div className="App">
                        <div className="loginDiv">
                            <h2>SignUp</h2>
                            <pre className="login-label">Username </pre>
                            <input type="text" value={this.state.username} onChange={this.updateUsername}></input>
                            <br></br>
                            <pre className="login-label">Password </pre>
                            <input type="password" value={this.state.password} onChange={this.updatePassword}></input>
                            <br></br>
                            <br></br>
                            <button className="login-button" onClick={this.registerUser}>Register</button>
    
                            <div className="instruction">
                                Already have an account? <a className="link" onClick={() => this.clickLink(true)}>Login</a>
                            </div>
                        </div>
                    </div>
                );
            }
        } 
}

export default Login;