import React, { Component } from 'react';
import cn from 'classnames';
import _ from 'lodash';
import { Link } from 'react-router';
import { changeDate } from '../actions/index.js';
import { connect } from 'react-redux';

class DayNames extends Component {
  moveToDayView(date) {
    console.log(date);
    this.props.changeDate(date.clone());
  }
  getDays() {
    const {weekStartDate} = this.props;
    const dayArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dateArray = [];
    if(weekStartDate) {
      _.reduce(dayArray,(date,day,index) => {
        dayArray[index] = `${day} ${date.clone().format('DD')}`;
        dateArray[index] = date.clone();
        return date = date.add(1, 'day');
      }, weekStartDate);
    }
    return dayArray.map((day, index) => {
      if(weekStartDate) {
        return(
          <Link onClick={()=>this.moveToDayView(dateArray[index])} to="/day-view" style={{cursor:'pointer'}} className="day" key={index}>{day}</Link>
        )
      }
      return(
        <span className="day" key={index}>{day}</span>
      )
    })
  }
  getDay(date) {
    return(
      <span className="day">{`${date.format('ddd')} ${date.format('DD')}`}</span>
    )
  }
  render() {
    const {className} = this.props;
    return (
      <div className={cn('custom-row', 'day-names', className)}>
        {this.getDays()}
      </div>
    )
  }
}

export default connect (null, { changeDate }) (DayNames);
