import React from 'react';
const { compose, withProps, withStateHandlers } = require("recompose");
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            position: {lat: 0.0, lng: 0.0 }
        }
    }

    getLatLng(markerPosition) {
    }
    render() {
        const that = this;
        const GoogleMapsComponent = compose(
            withStateHandlers(() => ({
                isMarkerShown: false,
                markerPosition: null,
              }), {
                onMapClick: ({ isMarkerShown }) => (e) => ({
                    markerPosition: e.latLng,
                    isMarkerShown:true
                })
              }),
              withScriptjs,
              withGoogleMap
          )
              (props =>
                  <GoogleMap
                      defaultZoom={8}
                      defaultCenter={{ lat: -34.397, lng: 150.644 }}
                      onClick={props.onMapClick}
                  >
                      {props.isMarkerShown && <Marker position={props.markerPosition} />}
          
                  </GoogleMap>
              );
        return (
            <div>
             <GoogleMapsComponent
                            onMapClick={this.getLatLng}
                            googleMapURL={"https://maps.googleapis.com/maps/api/js?key=AIzaSyDPgGF_QN1xOijSLG6WICVL5kI87YP7Hs0&v=3.exp&libraries=geometry,drawing,places"}
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div style={{ height: `250px`, width: '90%', margin: '0 auto' }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                        />
            </div>
        )
    }
}