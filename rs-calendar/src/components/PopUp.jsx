import React, {Component} from 'react';
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter} from 'react-bootstrap';
import moment from 'moment';
import cn from 'classnames';
import { getSpeakers } from '../actions';
import { connect } from 'react-redux';

class PopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      speakersFromState: null
    };
  }
  hideModal(){
    this.setState({isModalOpen: false})
    this.props.hideModaComponent()
  }
  componentWillMount() {
    this.setState({isModalOpen: this.props.isModalOpen})
    this.props.onGetSpeakers();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      isModalOpen: nextProps.isModalOpen,
      speakersFromState: nextProps.speakersFromState
    })
  }
  render() {
    const {
      type,
      title,
      start,
      duration,
      speakers,
      resources,
      location,
      id,
      description
    } = this.props;
    const beginDate = moment(start).utc().format('DD MMM YYYY');
    const beginTime = moment(start).utc().format('HH:mm:ss');
    const endDate = moment(start).utc().clone().add(duration, 'ms').format('DD MMM YYYY');
    const endTime = moment(start).utc().clone().add(duration, 'ms').format('HH:mm:ss');
    const speakersFromState = this.state.speakersFromState;
    // if(speakersFromState) {
    //   const filteredSpeakers = speakersFromState.filter((speakerFromState) => {
    //     return speakers.indexOf(speakerFromState.id) !== -1
    //   })
    // }
    return(
      <Modal show={this.state.isModalOpen} size='modal-lg' onHide={()=>this.hideModal()}>
        <ModalHeader>
          <button onClick={()=>this.hideModal()} type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <ModalTitle>{title}</ModalTitle>
          <div className={cn("event-type", {[`${type}`]:true})}>{type}</div>
          <div className="event-info">
            <div className="event-time-wrapper">
              <div className="event-time">
                <span><strong>Begin</strong></span>
                <span>{beginDate}</span>
                <span>{beginTime}</span>
              </div>
              <div className="event-time">
                <span><strong>End</strong></span>
                <span>{endDate}</span>
                <span>{endTime}</span>
              </div>
            </div>
            <div className="event-speakers">
              <h5><strong>Speakers</strong></h5>
              <div>
                {
                  !speakersFromState
                    ?
                      <i className="fa fa-spinner fa-spin"></i>
                    :
                      speakersFromState.filter((speakerFromState) => {
                        return speakers.indexOf(speakerFromState.id) !== -1
                      }).map((filteredSpeaker, index) => {
                        return (
                          <div className="speaker-wrapper">
                            <img className="speaker-avatar img-circle" width="30px" height="30px" src={filteredSpeaker.avatar} alt="avatar"/>
                            <span key={index}>{filteredSpeaker.name}</span>
                          </div>
                        )
                      })
                }
              </div>
            </div>
          </div>
          <hr/>
          <div className="event-detail">
            <span><strong>Address</strong></span>
            <span>{location}</span>
          </div>
          <hr/>
          <div className="event-detail">
            <span><strong>Info</strong></span>
            <span>{description}</span>
          </div>
        </ModalHeader>
        <ModalBody>
          <ModalTitle>Resources</ModalTitle>
          <div className="resources-wrapper">
            {resources.map((resource, index) => {
              return (
                <div className="resource-wrapper">
                  <h5 className="resource-title"><strong>{resource.type}</strong></h5>
                  <a href={resource.resource} className="resource-link">
                    View Details
                  </a>
                  <p className="resource-info">{resource.description}</p>
                </div>
              )
            })}
          </div>
        </ModalBody>
        <ModalFooter>Modal Footer Is Here</ModalFooter>
      </Modal>
    )
  }
}

function mapStateToProps(state) {
  return {
    speakersFromState: state.ajaxDataHandler.speakers,
    isSpeakersFetching: state.ajaxDataHandler.isSpeakersFetching
  }
}
export default connect (mapStateToProps, dispatch => ({
  onGetSpeakers:() => {
    dispatch(getSpeakers());
  }
})) (PopUp);
