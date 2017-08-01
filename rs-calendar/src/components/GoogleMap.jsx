import React, {Component} from 'react';
import googleMapsApi from 'google-maps';

googleMapsApi.KEY='AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo';
googleMapsApi.LANGUAGE='ru';
googleMapsApi.REGION='BY';
googleMapsApi.LIBRARIES = ['geometry', 'places'];

export default class GMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 17
    };
  }
  componentDidMount() {
    const that = this;
    const { address } = this.props;
    googleMapsApi.load(function(google) {
      const geocoder = new google.maps.Geocoder();
      const map = new google.maps.Map(
        that.refs.map,
        {
          zoom: that.state.zoom,
          scrollwheel: false
        }
      );
      if (geocoder) {
        geocoder.geocode({
          'address': address
        }, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            if (status !== google.maps.GeocoderStatus.ZERO_RESULTS) {
              map.setCenter(results[0].geometry.location);

              const infowindow = new google.maps.InfoWindow({
                content: '<b>' + address + '</b>',
                size: new google.maps.Size(150, 50)
              });

              const marker = new google.maps.Marker({
                position: results[0].geometry.location,
                map: map,
                title: address
              });
              google.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map, marker);
              });

            } else {
              alert("No results found");
            }
          } else {
            alert("Geocode was not successful for the following reason: " + status);
          }
        });
      }
    });
  }
	render() {
    const mapStyle = {
      width: 500,
      height: 300,
      border: '1px solid black'
    };
    return (
      <div className="google-map">
        <div ref="map" style={mapStyle}>I should be a map!</div>
      </div>
    )
  }
}
