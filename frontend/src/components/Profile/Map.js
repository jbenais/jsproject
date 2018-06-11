import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, } from "react-google-maps";
const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const GoogleMapsComponent = withScriptjs(withGoogleMap(props =>
            <GoogleMap

                defaultZoom={8}
                defaultCenter={{ lat: -34.397, lng: 150.644 }}
            >
            </GoogleMap>
        ));
        return (
            <div>
             <GoogleMapsComponent
                            googleMapURL={"https://maps.googleapis.com/maps/api/js?key=AIzaSyDPgGF_QN1xOijSLG6WICVL5kI87YP7Hs0&v=3.exp&libraries=geometry,drawing,places"}
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div style={{ height: `250px`, width: '90%', margin: '0 auto' }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                        />
            </div>
        )
    }
}