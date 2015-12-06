import React from 'react';
import _ from 'underscore';
import moment from 'moment';

const Clock = React.createClass({
	getInitialState() {
		return {
			onBreak: false,
			currentBreak: null,
			nextBreak: null,
			currentDate: moment(),
		}
	},

	componentWillMount() {
		
		let mo = _.find(this.props.dateRanges,(obj) => {
			return moment(obj.range.end) > moment();
		})
		let ind = this.props.dateRanges.indexOf(mo)
		if (mo.range.contains(moment())) {
			this.setState({
				onBreak: true,
				currentBreak: mo,
				nextBreak: this.props.dateRanges[ind+1]
			})
		} else {
			this.setState({
				nextBreak: mo,
			})
		}
	},

	componentDidMount() {
		setInterval(() => {
			if (this.state.onBreak && moment() > this.state.currentBreak.range.end) {
				this.setState({
					onBreak: false,
					currentBreak: null,
					currentDate: moment(),
				})
			} else if (!this.state.onBreak && moment() >= this.state.nextBreak.range.start) {
				let ind = this.props.dateRanges.indexOf(this.state.nextBreak);
				this.setState({
					onBreak: true,
					currentBreak: this.state.nextBreak,
					nextBreak: this.props.dateRanges[ind+1],
					currentDate: moment(),
				})
			} else {
				this.setState({
					currentDate: moment(),
				})
			}
		}, 1000)
	},

	render() {
		let mom = _.find(this.props.dateRanges,(obj) => {
			return obj.range.end > moment();
		})

		let state = this.state.nextBreak.state.replace(/^\w/, this.state.nextBreak.state.charAt(0).toUpperCase())
		return (
			<div className="clock-container">
				{this.state.onBreak &&
					<h1>You are on break!</h1>}
					{!this.state.onBreak &&
						<div className='clock'>
							<div className="clock-container">
								<div className="clock-days-container">
									<h1 className="clock-days">{moment(this.state.nextBreak.range.start.diff(this.state.currentDate)).format('DDD')}</h1>
									<h4 className="clock-day">Days</h4>
								</div>
								<div className="clock-hours-container">
									<h1 className="clock-hours">{moment(this.state.nextBreak.range.start.diff(this.state.currentDate)).format('HH')}</h1>
									<h4 className="clock-hour">Hours</h4>
								</div>
								<div className="clock-minutes-container">
									<h1 className="clock-minutes">{moment(this.state.nextBreak.range.start.diff(this.state.currentDate)).format('mm')}</h1>
									<h4 className="clock-minute">Minutes</h4>
								</div>
								<div className="clock-seconds-container">
									<h1 className="clock-seconds">{moment(this.state.nextBreak.range.start.diff(this.state.currentDate)).format('ss')}</h1>
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