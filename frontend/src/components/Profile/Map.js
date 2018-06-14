import React from 'react';
const { compose, withProps, withStateHandlers } = require("recompose");
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mapCenter: { lat: 48.723627, lng: 21.254199900000003 },
            markers: {
                position: {
                    lat: 48.723627,
                    lng: 21.254199900000003,
                },
            },
        }
        this.handleMapClick = this.handleMapClick.bind(this);
    }


    handleMapClick(event) {
        this.setState({
            markers: {
                position: {
                    lat: event.latLng.lat(),
                    lng: event.latLng.lng()
                }
            },
            mapCenter: event.latLng
        });

    }

    render() {
        const GoogleMapsComponent =  withScriptjs(withGoogleMap(props => (
            <GoogleMap
                ref={props.onMapLoad}
                defaultZoom={13}
                defaultCenter={props.center}
                onClick={props.onMapClick}
            >
                <Marker {...props.markers} />
            </GoogleMap>
        )));

        return (
            <div>
             <GoogleMapsComponent
                center={this.state.mapCenter}
                onMapClick={this.handleMapClick}
                onMarker={this.getLatLng}
                googleMapURL={"https://maps.googleapis.com/maps/api/js?key=AIzaSyDPgGF_QN1xOijSLG6WICVL5kI87YP7Hs0&v=3.exp&libraries=geometry,drawing,places"}                        loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `250px`, width: '90%', margin: '0 auto' }} />}
                markers={this.state.markers}
                mapElement={<div style={{ height: `100%` }} />}
                        />
            </div>
        )
    }
}