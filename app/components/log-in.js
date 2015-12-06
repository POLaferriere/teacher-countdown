import React from 'react'
import User from '../models/user'

const LogIn = React.createClass({
	getInitialState() {
		return {
			signedIn: true,
			error: null,
		}
	},

	handleSubmit(e) {
		e.preventDefault();

		let username = this.refs.username.value;
		let password = this.refs.password.value;

		session.authenticate({username, password}).then(this.props.onLogin)
	},

	goToSignup() {
		this.setState({
			signedIn: false,
		})
	},

	goToLogin() {
		this.setState({
			signedIn: true,
		})
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
				return session.authenticate({sessionToken: user.get('sessionToken')}).then(this.props.onSignup)
			})
		} else {
			this.setState({
				error: 'Your passwords do not match',
			})
		}
	},

	render() {
		return (
			<div className='login-container'>
			{this.state.signedIn &&
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
					<input className='log-in-button' type="submit" value='Log In'/>
					<p className='log-in-signup'>{'Not signed up? '}
						<span className='log-in-click' onClick={this.goToSignup}>{'Click here to join'}</span>
					</p>
				</form>}

			{!this.state.signedIn &&
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
					<input type="submit" className="signup-button" value='Sign Up'/>
					<p className="signup-back" onClick={this.goToLogin}>Go back to login page</p>
				</form>}	
			</div>
		)
	}
})

export default LogIn