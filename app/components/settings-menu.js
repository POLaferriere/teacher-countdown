import React from 'react'
import {History} from 'react-router'

const SettingsMenu = React.createClass({
	mixins: [History],

	goToModal() {
		this.history.pushState({}, 'pick-district')
	},
	
	render() {
		return (
			<div className="settings-menu">
				<div className="settings-triangle"/>
				<div className="settings-triangle-border"/>
				<ul className="settings">
					<li className="setting" onClick={this.goToModal}>Change District</li>
					<li className="setting">Edit Dates</li>
					<li className="setting">Sign Out</li>
				</ul>
			</div>
		)
	}	
})

export default SettingsMenu;