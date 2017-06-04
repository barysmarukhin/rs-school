import React from 'react';
import TimeLine from './TimeLine';
import { connect } from 'react-redux';
import { changeView } from '../actions';

class DayView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      day: props.dateFromState,
    };
  }
  componentWillMount() {
    this.props.changeView('day')
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      day: nextProps.dateFromState,
    });
  }
  render() {
    return (
      <div className="day-view">
        <div className="day-view__content">
          <TimeLine
            className="time-gutter"
            isShown={true}
            date={this.props.date || this.props.dateFromState}
          />
          <TimeLine
            className="day-slot"
            date={this.props.date || this.props.dateFromState}
            isShown={false}
          />
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    dateFromState: state.calendarNavigation.date
  }
}
export default connect (mapStateToProps, { changeView }) (DayView);
