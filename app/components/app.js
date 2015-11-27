import React from 'react';
import moment from 'moment';
require('moment-range');
import DateRangePicker from 'react-daterange-picker';

const stateDefinitions = {
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
};

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
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

const App = React.createClass({
  getInitialState() {
    return {
      time: moment(moment('2016-1-25').valueOf() - Date.now()).format('DDD [days] H [hours] mm [minutes] ss [seconds]'),
      value: null,
      dateRanges: []
    }
  },

  componentWillMount() {
    // setInterval(() => {
    //   this.setState({
    //     time: moment(moment('2016-1-25').valueOf() - Date.now()).format('DDD [days] H [hours] mm [minutes] ss [seconds]')
    //   })
    // }, 999)
  },

  handleSelect(range) {
    this.setState({
      value: range,
    })
  },

  handleSave(e) {
    e.preventDefault()

    stateDefinitions[camelize(this.state.textValue)] = {
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
    })
  }, 

  handleTextChange(e) {
    this.setState({
      textValue: e.target.value,
    })
  },

  render() {
    return (
      <div className='container'>
        <DateRangePicker 
        firstOfWeek={1}
        onSelect={this.handleSelect} 
        numberOfCalendars={1}
        selectionType='range'
        dateStates={this.state.dateRanges}
        minimumData={new Date()}
        value={this.state.value}
        defaultState='available'
        stateDefinitions={stateDefinitions}
        dateStates={this.state.dateRanges}/>
        <button onClick={this.handleSave}>Select</button>
        <input type="text" value={this.state.textValue} onChange={this.handleTextChange}/>
      </div>
    );
  }

});

export default App;
