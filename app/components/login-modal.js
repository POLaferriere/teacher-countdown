import React from 'react';
import dynamics from 'dynamics.js'
import MultiDateRange from './multi-daterange'
import PickDistrict from './pick-district'
import {History} from 'react-router'

const LoginModal = React.createClass({
	mixins: [History],

	getInitialState() {
		return {
			districtPicked: false,
		}
	},

	componentDidMount() {
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

	onSelect() {
		this.history.pushState({}, 'clock')
	},

	onCreating() {
		this.setState({
			districtPicked: true,
		})

		dynamics.animate(document.querySelector('.modal'), {
			height: 600,
			marginTop: -100,
		}, {
			type: dynamics.easeInOut,
			duration: 500,
		})
		
	},

	render() {
		return (
			<div className="modal">
				{!this.state.districtPicked &&
					<PickDistrict onCreating={this.onCreating} onSelect={this.onSelect}/>
				}

				{this.state.districtPicked && 
					<MultiDateRange onClose={this.closeModal} onSave={this.props.onSave}/>
				}
			</div>
		)
	}
})

export default LoginModal;