import React from 'react';
import MonthViewDay from './MonthViewDay';

export default class MonthViewWeek extends React.Component {
  render() {
    const days = [];
    let {
      date,
    } = this.props;
    const {
      month,
    } = this.props;
    for (let i = 0; i < 7; i++) {
      let day = {
          name: date.format("dd").substring(0, 2),
          number: date.date(),
          isCurrentMonth: date.month() === month.month(),
          isToday: date.isSame(new Date(), "day"),
          date: date
      };
      days.push(
        <MonthViewDay day={day} key={i}/>
      );

      date = date.clone();
      date.add(1, "day");
    }
    return (
      <div className="custom-row week">
        {days}
      </div>
    );
  }
}
