import React from 'react';
import _ from 'underscore';
import moment from 'moment';
import Icon from 'react-fa';
import SettingsMenu from './settings-menu'
import dynamics from 'dynamics.js'

const Clock = React.createClass({
	getInitialState() {
		return {
			onBreak: false,
			currentBreak: '',
			nextBreak: '',
			currentDate: moment(),
			showMenu: false,
		}
	},

	componentWillMount() {
		if(session.getCurrentDistrict()) {
		let breaks = session.getCurrentDistrict().get('breaks').map((ind) => {
			return {
					range: moment.range(ind.range.start, ind.range.end),
					state: ind.state,
				}
		})

		let mo = _.find(breaks,(obj) => {
			return moment(obj.range.end) > moment();
		})
		let ind = breaks.indexOf(mo)
		if (mo.range.contains(moment())) {
			this.setState({
				onBreak: true,
				currentBreak: mo,
				nextBreak: breaks[ind+1]
			})
		} else {
			this.setState({
				nextBreak: mo,
			})
		}
	}
	},

	componentDidMount() {
		let breaks = session.getCurrentDistrict().get('breaks').map((ind) => {
			return {
					range: moment.range(ind.range.start, ind.range.end),
					state: ind.state,
				}
		})

		setInterval(() => {
			if (this.state.onBreak && moment() > this.state.currentBreak.range.end) {
				this.setState({
					onBreak: false,
					currentBreak: null,
					currentDate: moment(),
				})
			} else if (!this.state.onBreak && moment() >= this.state.nextBreak.range.start) {
				let ind = breaks.indexOf(this.state.nextBreak);
				this.setState({
					onBreak: true,
					currentBreak: this.state.nextBreak,
					nextBreak: breaks[ind+1],
					currentDate: moment(),
				})
			} else {
				this.setState({
					currentDate: moment(),
				})
			}
		}, 1000)
	},

	showMenu() {
		if(!this.state.showMenu) {
			this.setState({
				showMenu: true,
			})
			let menu = document.querySelector('.settings-menu')
			let menuItems = document.querySelectorAll('.setting')

			dynamics.animate(menu, {
				opacity: 1,
				scale: 1,
			}, {
				type: dynamics.spring,
				frequency: 200,
				friction: 270,
				duration: 800,
			})

			for (var i = 0; i < menuItems.length; i++) {
				let menuItem = menuItems[i];
				dynamics.css(menuItem, {
					opacity: 0,
					translateY: 20,
				})

				dynamics.animate(menuItem, {
					opacity: 1,
					translateY: 0,
				}, {
					type: dynamics.spring,
					frequency: 300,
					friction: 435,
					duration: 1000,
					delay: 100 + i * 40
				})
			}
		}

		if(this.state.showMenu) {
			this.setState({
				showMenu: false,
			})

			dynamics.animate(document.querySelector('.settings-menu'), {
				scale: 0.1,
				opacity: 0,
			}, {
				type: dynamics.easeInOut,
				duration: 300,
				friction: 150,
			})
		}
	},

	render() {
		let mom = _.find(this.props.dateRanges,(obj) => {
			return obj.range.end > moment();
		})

		let state = this.state.nextBreak && this.state.nextBreak.state.replace(/^\w/, this.state.nextBreak.state.charAt(0).toUpperCase())
		return (
			<div className="clock-container">
				<Icon name='cog' id='settings' onClick={this.showMenu}/>
				<SettingsMenu/>

				{this.state.onBreak &&
					<h1>You are on break!</h1>}
				{!this.state.onBreak &&
					<div className='clock'>
						<div className="clock-container">
							<div className="clock-days-container">
								<h1 className="clock-days">{moment(this.state.nextBreak && this.state.nextBreak.range.start.diff(this.state.currentDate)).format('DDD')}</h1>
								<h4 className="clock-day">Days</h4>
							</div>
							<div className="clock-hours-container">
								<h1 className="clock-hours">{moment(this.state.nextBreak && this.state.nextBreak.range.start.diff(this.state.currentDate)).format('HH')}</h1>
								<h4 className="clock-hour">Hours</h4>
							</div>
							<div className="clock-minutes-container">
								<h1 className="clock-minutes">{moment(this.state.nextBreak && this.state.nextBreak.range.start.diff(this.state.currentDate)).format('mm')}</h1>
								<h4 className="clock-minute">Minutes</h4>
							</div>
							<div className="clock-seconds-container">
								<h1 className="clock-seconds">{moment(this.state.nextBreak && this.state.nextBreak.range.start.diff(this.state.currentDate)).format('ss')}</h1>
								<h4 className="clock-second">Seconds</h4>
							</div>
						</div>
						<h4 className="clock-break">{'until ' + state}</h4>
					</div>}
			</div>
		)
	}
})

export default Clock;