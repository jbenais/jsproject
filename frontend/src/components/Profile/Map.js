import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mapCenter: this.props.center,
            markers: {
                position: this.props.markers,
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
        this.props.onMapClick(this.state.markers.position, this.state.mapCenter)
    }

    render() {
        const markersExist = this.state.markers.position.lat !== null && this.state.markers.position.lng !== null;
        const GoogleMapsComponent =  withScriptjs(withGoogleMap(props => (
            <GoogleMap
            
                ref={props.onMapLoad}
                defaultZoom={1}
                defaultCenter={props.center}
                onClick={props.onMapClick}
            >
            {markersExist ? <Marker {...props.markers}/> : <div/>}
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