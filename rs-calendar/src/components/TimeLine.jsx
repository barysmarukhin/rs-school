import React from 'react';
import cn from 'classnames';
import BackgroundWrapper from './BackgroundWrapper';
import PopUp from './PopUp';
import moment from 'moment';
import { connect } from 'react-redux';

class TimeLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModalComponent: false,
      events:props.eventsFromState,
      currentEvent: {
        type: null,
        title: null,
        start: null,
        speakers: null,
        location: null,
        id: null,
        duration: null,
        description: null
      }
    };
  }
  componentWillReceiveProps(nextProps) {
    if(!this.state.events.length) {
      this.setState({
        events: nextProps.eventsFromState,
      });
    }
  }
  hideModaComponent() {
    this.setState({
      showModalComponent:false
    });
  }
  getDayEvents(events, date) {
    if(events) {
      return events.filter((event, index)=>{
        return moment(event.start).isAfter(date.startOf('day')) && moment(event.start).isBefore(date.endOf('day'))
      })
    }
    return null
  }
  getTimeCell(time, isShown, dayEvents) {
    const timeCellItems = [];
    for(let i = 0,top = 0; i < 6; i++) {
      if(isShown) {
        timeCellItems.push(
          <BackgroundWrapper time={time} key={i}>
            <span className="timeline__item-minutes">{time.format('HH:mm')}</span>
          </BackgroundWrapper>
        )
      } else {
        timeCellItems.push(
          <BackgroundWrapper time={time} key={i}>
            <span className="timeline__item-minutes"></span>
          </BackgroundWrapper>
        )
      }
      for(let j = 0; j < dayEvents.length; j++){
        const newCurrentEvent = Object.assign({}, this.state.currentEvent);
        newCurrentEvent.type = dayEvents[j].tags[0];
        newCurrentEvent.title = dayEvents[j].name;
        newCurrentEvent.start = dayEvents[j].start;
        newCurrentEvent.speakers = dayEvents[j].speakers;
        newCurrentEvent.location = dayEvents[j].location.address;
        newCurrentEvent.id = dayEvents[j]._id;
        newCurrentEvent.duration = dayEvents[j].duration;
        newCurrentEvent.description = dayEvents[j].description;
        const start = moment(dayEvents[j].start).clone();
        const duration = dayEvents[j].duration;

        if(start.isSameOrAfter(time) && start.isBefore(time.clone().add(10,'minute'))) {
          const beginDate = start.format('DD MMM YYYY');
          const beginTime = start.format('HH:mm:ss');
          const endDate = start.add(duration, 'ms').format('DD MMM YYYY');
          const endTime = start.add(duration, 'ms').format('HH:mm:ss');
          timeCellItems.push(
            <article
              style={{top:`${top}px`, cursor:'pointer'}}
              className={cn("timeline__item-event",{[`${dayEvents[j].tags[0]}`]:true})}
              key={Math.random()}
              onClick={()=>this.setState({
                showModalComponent: true,
                currentEvent: newCurrentEvent
              })}
            >
              <h3 className="event__title"><strong>{dayEvents[j].name}</strong></h3>
              <h4>{dayEvents[j].tags[0]}</h4>
              <div className="event__content">
                <p>
                  <strong><em>Begin</em></strong>&nbsp;{beginDate}&nbsp;{beginTime}
                </p>
                <p>
                  <strong><em>End</em></strong>&nbsp;{endDate}&nbsp;{endTime}
                </p>
                <p>
                  <strong><em>Address</em></strong>&nbsp;{dayEvents[j].location.address}
                </p>
              </div>
            </article>
          )
        }
      }
      time = time.clone().add(10,'minute');
      top+=20;
    }
    return timeCellItems
  }
  getHours() {
    const {date, isShown} = this.props;
    let startDate = date.clone().startOf('day');
    const dayTimeArray = [];
    const dayEvents = this.getDayEvents(this.state.events, date);
    let dayHours = 24;
    while(dayHours--) {
      dayTimeArray.push(startDate);
      startDate=startDate.clone().add(60, 'minute');
    }
    return (dayTimeArray.map((time, index) => {
      return(
        <div className="timeline__item" key={index}>
          {this.getTimeCell(time, isShown, dayEvents)}
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
        {this.state.showModalComponent ?
          <PopUp
            hideModaComponent = {()=> this.hideModaComponent()}
            isModalOpen={true}
            type = {this.state.currentEvent.type}
            title = {this.state.currentEvent.title}
            start = {this.state.currentEvent.start}
            speakers = {this.state.currentEvent.speakers}
            resources = {this.state.currentEvent.resources}
            location = {this.state.currentEvent.location}
            id = {this.state.currentEvent.id}
            duration = {this.state.currentEvent.duration}
            description = {this.state.currentEvent.description}
          />
          :
          null
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    dateFromState: state.calendarNavigation.date,
    eventsFromState: state.ajaxDataHandler.events,
  }
}
export default connect (mapStateToProps,null) (TimeLine);
