import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';

import App from './components/app';
import LogIn from './components/log-in'
import Signup from './components/signup'
import LoginModal from './components/login-modal'
import Clock from './components/clock'

ReactDOM.render((
	<Router>
		<Route path='/' component={App}>
			<Route path='login' component={LogIn}/>
			<Route path='signup' component={Signup}/>
			<Route path='pick-district' component={LoginModal}/>
			<Route path='clock' component={Clock}/>
		</Route>
	</Router>
), document.getElementById('application'));
