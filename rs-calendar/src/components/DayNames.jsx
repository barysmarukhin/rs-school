import React, { Component } from 'react';
import cn from 'classnames';
import _ from 'lodash';

class DayNames extends Component {
  getDays() {
    const {weekStartDate} = this.props;
    const dayArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    if(weekStartDate) {
      _.reduce(dayArray,(date,day,index) => {
        dayArray[index] = `${day} ${date.format('DD')}`;
        return date = date.add(1, 'day');
      }, weekStartDate);
    }
    return dayArray.map((day, index) => {
      return(
        <span className="day" key={index}>{day}</span>
      )
    })
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

export default DayNames;
