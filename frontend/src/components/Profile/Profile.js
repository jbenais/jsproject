import React from 'react';
import Map from './Map';
import ProfileInfos from './ProfileInfos';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: {lat: null, lng: null},
            mapCenter: {lat: 14, lng: 12}
        }
        this.handleMarkers = this.handleMarkers.bind(this);
    }

    handleMarkers(position, center) {
        this.setState({
            markers: {lat: position.lat, lng: position.lng},
            mapCenter: center
        });
    }
    render() {
        const data = this.props.data;
        let markers = {lat: data.user_address ? data.user_address.latitude : null, lng: data.user_address ? data.user_address.longitude : null}
        return ( 
            <div id="container">
                <div className="left">
                    <div className="picture">
                        <img id="img" style={{ width: '50%', height: '50%' }} src={data.user_picture[0].url} />
                    </div>
                    <div className="full-name">
                        {data.user_general.firstname} {data.user_general.lastname
                    }</div>
                    <div className="map">21 ans</div>
                    <Map center={this.state.mapCenter} markers={markers} onMapClick={this.handleMarkers}/>
                </div>
                <div className="profile-infos">
                    <ProfileInfos position={this.state.markers} data={this.props.data}/>
                </div>
            </div>
        )
    }
}