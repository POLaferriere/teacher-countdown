import React from 'react';
import dynamics from 'dynamics.js'
import MultiDateRange from './multi-daterange'
import PickDistrict from './pick-district'

const LoginModal = React.createClass({
	getInitialState() {
		return {
			districtPicked: false,
		}
	},

	onCreating() {
		this.setState({
			districtPicked: true,
		})

		setTimeout(() => {
			dynamics.animate(document.querySelector('.modal'), {
				height: 600,
				marginTop: -100,
			}, {
				type: dynamics.easeInOut,
				duration: 500,
			})
		})
	},

	render() {
		return (
			<div className="modal">
				{!this.state.districtPicked &&
					<PickDistrict onCreating={this.onCreating} onSelect={this.props.onSelect}/>
				}

				{this.state.districtPicked && 
					<MultiDateRange onClose={this.closeModal} onSave={this.props.onSave}/>
				}
			</div>
		)
	}
})

export default LoginModal;