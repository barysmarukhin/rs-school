import React, {Component} from 'react';
import { connect } from 'react-redux';
import { changeView } from '../actions/index';
import moment from 'moment';
import cn from 'classnames';
import PopUp from './PopUp';

class AgendaView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dayCurrentMonth: props.dateFromState,
      dayNextMonth: props.dateFromState.clone().add(1,'month'),
      events:props.eventsFromState,
      showModalComponent: false,
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
  componentWillMount() {
    this.props.changeView('agenda');
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      dayCurrentMonth: nextProps.dateFromState.clone(),
      dayNextMonth: nextProps.dateFromState.clone().add(1,'month'),
    });
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
  getEvents(events) {
    return events.filter((event, index) => {
      return moment(event.start).isAfter(this.state.dayCurrentMonth) && moment(event.start).isBefore(this.state.dayNextMonth)
    }).sort((left, right)=>{
      return moment(left.start).diff(moment(right.start))
    }).map((event, index) => {
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
        <table key={index} className="agenda-view__table agenda-view__table--content">
          <tbody>
            <tr>
              <td className="agenda-view__item">{moment(event.start).format('DD-MM-YYYY')}</td>
              <td className="agenda-view__item">{moment(event.start).format('HH:mm:ss')}</td>
              <td className="agenda-view__item agenda-view__item--link"
                onClick={()=>this.setState({
                  showModalComponent: true,
                  currentEvent: newCurrentEvent
                })}
                >
                <em>{event.title}</em>
              </td>
              <td
                className={cn("agenda-view__item", "agenda-view__item--link", { [`${event.type}`]: true })}
                  onClick={()=>this.setState({
                    showModalComponent: true,
                    currentEvent: newCurrentEvent
                  })}
                >{event.type}
              </td>
            </tr>
          </tbody>
        </table>
      )
    })
  }
  render() {
    if(this.props.isEventsFetching) {
      return (<i className="fa fa-spinner fa-spin"></i>)
    }
    if(this.state.events.length) {
      const events = this.state.events
      return (
        <section className="agenda-view">
          <table className="agenda-view__table">
            <thead>
              <tr>
                <th className="agenda-view__header">Date</th>
                <th className="agenda-view__header">Time</th>
                <th className="agenda-view__header">Title</th>
                <th className="agenda-view__header">Type</th>
              </tr>
            </thead>
          </table>
          {this.getEvents(events)}
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
        </section>
      );
    }
    return (
      <section className="agenda-view">
        <table className="agenda-view__table">
          <thead>
            <tr>
              <th className="agenda-view__header">Date</th>
              <th className="agenda-view__header">Time</th>
              <th className="agenda-view__header">Type</th>
              <th className="agenda-view__header">Title</th>
            </tr>
          </thead>
        </table>
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    dateFromState: state.calendarNavigation.date,
    eventsFromState: state.ajaxDataHandler.events,
    isEventsFetching: state.ajaxDataHandler.isEventsFetching
  }
}
export default connect (mapStateToProps, { changeView }) (AgendaView);
