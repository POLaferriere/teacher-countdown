import React from 'react';
import User from '../models/user';
import {History} from 'react-router'

const Signup = React.createClass({
	mixins: [History],

	getInitialState() {
		return {
			error: null,
		}
	},

	handleSignup(e) {
		e.preventDefault();
		let username = this.refs.username.value;
		let email = this.refs.email.value;
		let password = this.refs.password.value;
		let passwordRepeat = this.refs.passwordRepeat.value;

		if(password === passwordRepeat){
			let user = new User()
			user.save({username, email, password}, {error: (obj, response) => {
				this.setState({
					error: response.responseJSON.error,
				})
			}}).then(() =>{
				return session.authenticate({sessionToken: user.get('sessionToken')}).then(() => {this.history.pushState({}, 'pickDistrict')})
			})
		} else {
			this.setState({
				error: 'Your passwords do not match',
			})
		}
	},

	goToLogin() {
		this.history.pushState({}, 'login')
	},

	render() {
		return (
			<form className='signup' onSubmit={this.handleSignup}	>
				<h1 className="signup-title">Sign Up</h1>
				<div className="signup-username-container">
					<label className='signup-username'>Choose a username</label>
					<input type="text" ref='username'/>
				</div>
				<div className="signup-email-container">
					<label className="signup-email">Enter email</label>
					<input type="text" ref='email'/>
				</div>
				<div className="signup-password-container">
					<label className="signup-password">Choose a password</label>
					<input type="password" ref='password'/>
				</div>
				<div className="signup-password-repeat-container">
					<label className="signup-password-repeat">Repeat password</label>
					<input type="password" ref='passwordRepeat'/>
				</div>
				<button className="signup-button" onClick={this.handleSignup}>Sign Up</button>
				<p className="signup-back" onClick={this.goToLogin}>Go back to login page</p>
			</form>
		)
	}
})

export default Signup