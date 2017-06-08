import React, { Component } from 'react';
import { connect } from 'react-redux';
import { moveNext, movePrev } from '../actions/index';

class CalendarNav extends Component {
  previous() {
    this.props.movePrev()
  }
  next() {
    this.props.moveNext()
  }
  renderDateLabel() {
    const {
      viewType,
      dateFromState
    } = this.props
    switch (viewType) {
      case 'month':
        return <span className="date-label">{dateFromState.clone().format('MMMM YYYY')}</span>;
      case 'week':
        const startOfWeek = dateFromState.clone().startOf('week').format('DD MMMM YYYY');
        const endOfWeek = dateFromState.clone().endOf('week').format('DD MMMM YYYY');
        return <span className="date-label">{startOfWeek} - {endOfWeek}</span>;
      case 'day':
        return <span className="date-label">{dateFromState.clone().format('ddd DD MMMM YYYY')}</span>
      case 'agenda':
        const dayCurrentMonth = dateFromState.clone().format('DD MMMM YYYY');
        const dayNextMonth = dateFromState.clone().add(1,'month').format('DD MMMM YYYY');
        return <span className="date-label">{dayCurrentMonth} - {dayNextMonth}</span>;
      default:
        return <span className="date-label">Unknown date format</span>;
    }
  }
  render() {
    return (
      <div className="calendar__nav">
        <div className="month-display custom-row">
          <i className="arrow fa fa-angle-left" onClick={()=>this.previous()}/>
          {this.renderDateLabel()}
          <i className="arrow fa fa-angle-right" onClick={()=>this.next()}/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    dateFromState: state.calendarNavigation.date,
    viewType: state.calendarNavigation.viewType
  }
}

export default connect (mapStateToProps, { movePrev, moveNext }) (CalendarNav);
