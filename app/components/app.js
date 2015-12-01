import React from 'react';
import MultiDateRange from './multi-daterange'
import dynamics from 'dynamics.js'

const App = React.createClass({
	getInitialState() {
		return {
			showModal: false,
		}
	},

	showModal() {
		this.setState({
			showModal: true,
		})

		setTimeout(() => {dynamics.animate(document.querySelector('.modal'), {
			opacity: 1,
			scale: 1,
			translateX: -250,
			translateY: -200,
		}, {
			type: dynamics.spring,
			duration: 850,
			frequency: 200
		})})
	},

	closeModal() {
		dynamics.animate(document.querySelector('.modal'), {
			opacity: 0,
		}, {
			type: dynamics.easeInOut,
			duration: 500,
		})

		setTimeout(() => {this.setState({
			showModal: false,
		})}, 500)
	},

	render() {
		return (
			<div className="app">
				<button onClick={this.showModal}>Set Dates</button>
				{this.state.showModal &&
					<div className="modal">
						<MultiDateRange onClose={this.closeModal}/>
					</div>}
			</div>
		)
	}
})

export default App;