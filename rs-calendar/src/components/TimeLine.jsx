import React from 'react';
import cn from 'classnames';

export default class TimeLine extends React.Component {
  getHours() {
    const {date, isShown} = this.props;
    const startDate = date.startOf('day');
    const dayTimeArray = [];
    // const hourDivider = 2;
    // let dayHours =  24*hourDivider;
    let dayHours = 24;
    while(dayHours--) {
      dayTimeArray.push(startDate.format('hh:mma'));
      startDate.add(60, 'minute');
    }
    return (dayTimeArray.map((time, index) => {
      if (isShown) {
        return(<span className="timeline__item" key={index}>{time}</span>)
      }
      return (<span className="timeline__item" key={index}></span>)
    })
    )
  }
  render() {
    const { isToday, className } = this.props;
    return (
      <div className={cn('timeline', className,{'today': isToday})}>
        {this.getHours()}
      </div>
    );
  }
}
