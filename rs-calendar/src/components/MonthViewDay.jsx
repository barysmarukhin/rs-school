import React from 'react';
import cn from 'classnames';

export default class MonthViewDay extends React.Component {
  render() {
    const {
      day: {
        date,
        isCurrentMonth,
        isToday,
        number
      },
    } = this.props;

    return (
      <span
        key={date.toString()}
        className = {cn("day",{"today": isToday},{"different-month":!isCurrentMonth})}
      >
        {number}
      </span>
    );
  }
}
