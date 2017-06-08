import React from 'react';
import cn from 'classnames';
import BackgroundWrapper from './BackgroundWrapper';

export default class TimeLine extends React.Component {
  getTimeCell(time, isShown) {
    const timeCellItems = [];
    for(let i = 0; i < 6; i++) {
      if(isShown) {
        timeCellItems.push(
          <BackgroundWrapper time={time} key={i}>
            <span className="timeline__item-minutes">{time.format('hh:mma')}</span>
          </BackgroundWrapper>
        )
      } else {
        timeCellItems.push(
          <BackgroundWrapper time={time} key={i}>
            <span className="timeline__item-minutes"></span>
          </BackgroundWrapper>
        )
      }
      time = time.clone().add(10,'minute');
    }
    return timeCellItems
  }
  getHours() {
    const {date, isShown} = this.props;
    let startDate = date.clone().startOf('day');
    const dayTimeArray = [];
    // const hourDivider = 2;
    // let dayHours =  24*hourDivider;
    let dayHours = 24;
    while(dayHours--) {
      dayTimeArray.push(startDate);
      startDate=startDate.clone().add(60, 'minute');
    }

    return (dayTimeArray.map((time, index) => {
      return(
        <div className="timeline__item" key={index}>
          {this.getTimeCell(time, isShown)}
        </div>
      )
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
