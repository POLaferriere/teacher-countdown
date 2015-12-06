import React from 'react'
import store from '../store'
import $ from 'jquery'

const PickDistrict = React.createClass({
	handleSelect(e) {
		let districts = store.getDistrictCollection()
		let district = districts.find((district) => {return district.get('district') == this.refs.district.value})
		console.log(this.refs.check.checked)
		if (this.refs.check.checked) {
			$.ajax({
				url: 'https://api.parse.com/1/users/' + session.getCurrentUser().get('objectId'),
				method: 'PUT',
				data: JSON.stringify({
					homeDistrict: {
						__type: "Pointer",
						className: 'District',
						objectId: district.get('objectId')
					}
				})
			})
		}
		this.props.onSelect(district)	
	},

	handleCreate() {
		this.props.onCreating();
	},

	render() {
		let districts = store.getDistrictCollection()

		return (
			<div className="pick-district">
				<h4 className="pick-district-title">Please select a district</h4>
				<select className="pick-district-select" name="districts" required={true} ref='district'>
					<option value="" disabled selected>Select your district</option>
					{districts.map((district) => {
						return (<option value={district.get('district')}>{district.get('district')}</option>)
					})}
				</select>
				<div className="pick-district-default">
					<input type="checkbox" ref='check'/>
					<p>Set this district as your default</p>
				</div>
				<p className="pick-district-new">{"Can't find your district? "}
					<span className="pick-district-click" onClick={this.handleCreate}>{"Click here to set your's up"}</span>
				</p>
				<button className='pick-district-button' onClick={this.handleSelect}>Select District</button>
			</div>
		)
	}
})

export default PickDistrict