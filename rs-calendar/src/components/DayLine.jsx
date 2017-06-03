import React from 'react';
import TimeLine from './TimeLine';

export default class DayLine extends React.Component {
  render() {
    return (
      <TimeLine
        className="day-slot"
        date={ this.props.date }
        isToday={ this.props.isToday }
        isShown={false}
      />
    );
  }
}
