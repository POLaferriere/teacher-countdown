import React from 'react';
import moment from 'moment';
require('moment-range');
import DateRangePicker from 'react-daterange-picker';
import _ from 'underscore';
import store from '../store'



function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
    if (+match === 0) return "";
    return index == 0 ? match.toLowerCase() : match.toUpperCase();
  });
}

function randomizeColor() {
  var color = []
  var i = 0;
  while (i < 6 ) {
    color.push(Math.round(Math.random()*16).toString(16));
    i++;
  }
  return '#' + color.join('');
}

const MultiDateRange = React.createClass({
  getInitialState() {
    return {
      time: moment(moment('2016-1-25').valueOf() - Date.now()).format('DDD [days] H [hours] mm [minutes] ss [seconds]'),
      value: null,
      dateRanges: [],
      district: '',
      stateDefinitions: {
        available: {
          selectable: true,
          color: null,
          label: 'Available',
        },
        picked: {
          selectable: true,
          color: '#ffd200',
          label: 'Picked',
        },
      }
    }
  },

  handleDistrictChange(e) {
    this.setState({
      district: e.target.value,
    })
  },

  handleSelect(range) {
    this.setState({
      value: range,
    })
  },

  handleSave(e) {
    e.preventDefault()

    this.state.stateDefinitions[camelize(this.state.textValue)] = {
      label: this.state.textValue,
      color: randomizeColor(),
    }

    this.state.dateRanges.push({
      state: camelize(this.state.textValue),
      range: this.state.value,
    })
    this.setState({
      dateRanges: this.state.dateRanges,
      textValue: '',
      value: null,
      stateDefinitions: this.state.stateDefinitions,
    })
  }, 

  handleTextChange(e) {
    this.setState({
      textValue: e.target.value,
    })
  },

  handleSaveAndClose(e) {
    e.preventDefault();

    session.setCurrentDistrict(store.getDistrictCollection().create({
      district: this.state.district,
      breaks: this.state.dateRanges,
    }))
    this.history.setState({}, 'clock')
  },

  render() {
    return (
      <div className='multi-daterange'>
        <input 
          className='multi-district-input' 
          type="text" 
          placeholder='Enter name of district' 
          value={this.state.district}
          onChange={this.handleDistrictChange}/>
        <h1 className='multi-title'>Enter the established holidays in the calendar, one at a time</h1>
        <DateRangePicker 
        firstOfWeek={1}
        onSelect={this.handleSelect} 
        numberOfCalendars={1}
        selectionType='range'
        dateStates={this.state.dateRanges}
        minimumData={new Date()}
        value={this.state.value}
        defaultState='available'
        stateDefinitions={this.state.stateDefinitions}
        dateStates={this.state.dateRanges}
        singleDateRange={true}/>
        <div className="date-enter">
          <input 
            className='multi-name-input'
            type="text" 
            value={this.state.textValue} 
            onChange={this.handleTextChange}
            placeholder="Enter a name for the break"/>
          <button className='multi-set-button' onClick={this.handleSave}>Set</button>
        </div>
        <button className='multi-save-button' onClick={this.handleSaveAndClose}>Save and Close</button>
      </div>
    );
  }

});

export default MultiDateRange;
