import React from 'react';
import dynamics from 'dynamics.js'
import moment from 'moment'
require('moment-range');

import Clock from './clock'
import LogIn from './log-in'
import LoginModal from './login-modal'

import store from '../store'



const App = React.createClass({
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
				this.setState({
					setDates: true,
				})
				if(!!session.getCurrentUser().get('homeDistrict')) {
					let districts = store.getDistrictCollection()
					let district = districts.find((district) => {
						return district.get('objectId') == session.getCurrentUser().get('homeDistrict').objectId
					})
					this.showClock(district)
				} else {
					this.showModal()
				}
			})
		} else {
			districts.fetch()
			this.setState({
				logIn: true,
			})
		}
	},

	onLogin() {
		this.setState({
			logIn: false,
			setDates: true,
		})
		this.showModal()
	},

	showModal() {
		setTimeout(() => {dynamics.animate(document.querySelector('.modal'), {
			opacity: 1,
			scale: 1,
			translateX: -250,
			translateY: -200,
		}, {
			type: dynamics.spring,
			duration: 850,
			frequency: 200
		})}, 1000)
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