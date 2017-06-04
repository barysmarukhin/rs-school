import React from 'react';
import cn from 'classnames';
import BackgroundWrapper from './BackgroundWrapper';

export default class TimeLine extends React.Component {
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
      if (isShown) {
        return(
          <BackgroundWrapper time={time} key={index}>
            <span className="timeline__item">
              {time.format('hh:mma')}
            </span>
          </BackgroundWrapper>
        )
      }
      return (
        <BackgroundWrapper time={time} className="timeline__item" key={index}>
          <span className="timeline__item"></span>
        </BackgroundWrapper>
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
