import React from 'react';
import cn from 'classnames';
import PopUp from './PopUp';
import { connect } from 'react-redux';
import moment from 'moment';

class MonthViewDay extends React.Component {
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
        resources: null,
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
  getEvents(events, date) {
    if(events) {
      return events.filter((event, index)=>{
        return moment(event.start).format('D M YYYY') === date.format('D M YYYY')
      }).map((event, index)=>{
        const newCurrentEvent = Object.assign({}, this.state.currentEvent);
        newCurrentEvent.type = event.type;
        newCurrentEvent.title = event.title;
        newCurrentEvent.start = event.start;
        newCurrentEvent.speakers = event.speakers;
        newCurrentEvent.resources = event.resources;
        newCurrentEvent.location = event.location;
        newCurrentEvent.id = event.id;
        newCurrentEvent.duration = event.duration;
        newCurrentEvent.description = event.description;
        return (
          <div
            className={cn("day__event-item",{ [`${event.type}`]: true })}
            style={{cursor:'pointer'}}
            onClick={()=>this.setState({
              showModalComponent: true,
              currentEvent: newCurrentEvent
            })}
            key={index}
            >
            {moment(event.start).clone().format('HH:mm:ss')}&nbsp;
            {event.title}
          </div>
        )
      })
    }
    return null
  }
  hideModaComponent() {
    this.setState({
      showModalComponent:false
    });
  }
  render() {
    const {
      day: {
        date,
        isCurrentMonth,
        isToday,
        number,
      },
    } = this.props;
    const {events} = this.state;
    return (
      <div
        key={date.toString()}
        className = {cn("day",{"today": isToday},{"different-month":!isCurrentMonth})}
      >
        <div className="day__number">{number}</div>
        {
          this.props.isEventsFetching
          ?
            <i className="fa fa-spinner fa-spin"></i>
          :
            this.getEvents(events, date)
        }
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
    eventsFromState: state.ajaxDataHandler.events,
    isEventsFetching: state.ajaxDataHandler.isEventsFetching
  }
}
export default connect (mapStateToProps,null) (MonthViewDay);
