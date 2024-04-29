import React from 'react';
import  bcrpyt from "bcryptjs";

import WeatherDisplay from './weatherDisplay';

import './login.css';

interface LoginProps {

}

interface LoginState {
    username: string;
    password: string;
    displayWarn: boolean;
    loggedIn: boolean;
}

const correctUser: string = "Cambridge";
let correctPass: string = "";

/**
 * Login: 
 *      Login page for the application, contains a simple form with password hashing functions.
 * 
 * props: none
 * state: 
 *      username: current username value in the form
 *      password: current password value in the form
 *      displayWarn: boolean value determining whether warning is displayed
 *      loggedIn: used to determine if the user is logged in, redirects to weather page
 */
export default class Login extends React.Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props)

        this.state = {
            username: "", 
            password: "",
            displayWarn: false,
            loggedIn: false
        };

        this.handleFormUpdate = this.handleFormUpdate.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    render() {
        return this.state.loggedIn ? (<div className="page-container">
            <WeatherDisplay />
        </div>) : (
            <div className="page-container">
                <form className='login-form'>
                    <label>Username</label><br/>
                    <input type='text' name='username' placeholder="example@example.com" onChange={this.handleFormUpdate}/><br/>
                    <label>Password</label><br/>
                    <input type='password' name='password' onChange={this.handleFormUpdate}></input><br/>
                    <input className='submit' type='button' onClick={this.handleSubmit} value="Submit"/>
                    { this.state.displayWarn ? <div className='warning'>Incorrect username or password</div> : null }
                </form>
            </div>
        );
    }

    handleFormUpdate(event: any) {
        if (event.target.name === 'username') {
            this.setState({
                ...this.state,
                username: event.target.value
            })
        } else if (event.target.name === 'password') {
            this.setState({
                ...this.state,
                password: event.target.value
            })
        }
    }
    handleSubmit() {
        const hashedPassword = this.encryptPassword(this.state.password);
        bcrpyt.compare(correctPass, hashedPassword, (err, result) => {
            if (result && this.state.username === correctUser) {
                this.setState({
                    ...this.state,
                    loggedIn: true,
                    displayWarn: false
                });
            } else {
                this.setState({
                    ...this.state,
                    displayWarn: true
                })
            }
        });
    }

    encryptPassword(password: string): string {
        const saltRounds: number = 0;
        let hashedPassword: string = bcrpyt.hashSync(password, saltRounds);

        return hashedPassword;
    }
}