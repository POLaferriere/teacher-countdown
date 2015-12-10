import React from 'react';
import dynamics from 'dynamics.js'
import moment from 'moment'
require('moment-range');
import {History} from 'react-router'

import Clock from './clock'
import LogIn from './log-in'
import LoginModal from './login-modal'

import store from '../store'



const App = React.createClass({
	mixins: [History],

	getInitialState() {
		return {
			logIn: false,
			setDates: false,
			clock: false,
			dateRanges: null
		}
	},

	componentWillMount() {
		let districts = store.getDistrictCollection()

		if (!!localStorage.getItem('parse-session-token')) {
			
			districts.fetch().then(() => {
				if(!!session.getCurrentUser().get('homeDistrict')) {
					let districts = store.getDistrictCollection()
					let district = districts.find((district) => {
						return district.get('objectId') == session.getCurrentUser().get('homeDistrict').objectId
					})
					session.setCurrentDistrict(district);
					this.history.pushState({}, 'clock');
				} else {
					this.history.pushState({}, 'pick-district')
				}
			})
		} else {
			districts.fetch()
			this.history.pushState({}, 'login')
		}
	},

	onLogin() {
		this.setState({
			logIn: false,
			setDates: true,
		})
		this.showModal()
	},

	showClock(model) {
		this.setState({
			logIn: false,
			setDates: false,
			clock: true,
			dateRanges: model.get('breaks').map((ind) => {
				return {
					range: moment.range(ind.range.start, ind.range.end),
					state: ind.state,
				}
			})
		})
	},

	render() {
		return (
			<div className="app">
				{this.props.children}
				{this.state.logIn &&
					<LogIn onLogin={this.onLogin} onSignup={this.onLogin}/>}

				{this.state.setDates && 
					<LoginModal onSave={this.showClock} onSelect={this.showClock}/> }

				{/*Show clock when dates have been set */}		
				{this.state.clock &&
					<Clock dateRanges={this.state.dateRanges}/>}
			</div>
		)
	}
})

export default App;