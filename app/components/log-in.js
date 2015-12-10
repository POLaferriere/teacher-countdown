import React from 'react';
import {History} from 'react-router';

const LogIn = React.createClass({
	mixins: [History],

	getInitialState() {
		return {
			error: null,
		}
	},

	handleSubmit(e) {
		e.preventDefault();

		let username = this.refs.username.value;
		let password = this.refs.password.value;

		session.authenticate({username, password}).then((results) => {
			console.log(results)
			this.history.pushState({}, 'pick-district')
		})
	},

	goToSignup() {
		this.history.pushState({}, 'signup')
	},

	render() {
		return (
			<form className="log-in" onSubmit={this.handleSubmit}>
				<h1 className="log-in-title">Please Log In</h1>
				<div className="log-in-username-container">
					<label className='log-in-username'>Username</label>
					<input type="text" ref='username'/>
				</div>
				<div className="log-in-password-container">
					<label>Password</label>
					<input type="password" ref='password'/>
				</div>
				<button className='log-in-button' onClick={this.handleSubmit}>Log In</button>
				<p className='log-in-signup'>{'Not signed up? '}
					<span className='log-in-click' onClick={this.goToSignup}>{'Click here to join'}</span>
				</p>
			</form>
		)
	}
})

export default LogIn