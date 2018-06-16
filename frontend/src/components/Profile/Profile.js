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
            <div style={{ display: 'flex', flexDirection: 'row', padding: '20px' }}>
                <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', }}>
                        <img id="img" style={{ width: '50%', height: '50%' }} src={data.user_picture[0].url} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', fontFamily: 'Roboto', fontWeight: 800, fontSize: '18px', paddingTop: '20px' }}>{data.user_general.firstname} {data.user_general.lastname}</div>
                    <div style={{ display: 'flex', justifyContent: 'center', fontFamily: 'Roboto', fontWeight: 200, paddingBottom: '20px' }}>21 ans</div>
                    <Map center={this.state.mapCenter} markers={markers} onMapClick={this.handleMarkers}/>
                </div>
                <div style={{display: 'flex', flex: 2, justifyContent: 'center'}}>
                    <ProfileInfos position={this.state.markers} data={this.props.data}/>
                </div>
            </div>
        )
    }
}