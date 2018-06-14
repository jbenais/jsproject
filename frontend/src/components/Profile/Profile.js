import React from 'react';
import Map from './Map';
import ProfileInfos from './ProfileInfos';
export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const data = this.props.data;
        return ( 
            <div style={{ display: 'flex', flexDirection: 'row', padding: '20px' }}>
                <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', height: '30%' }}>
                        <img id="img" style={{ width: '80%', height: '80%' }} src={data.user_picture[0].url} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', fontFamily: 'Roboto', fontWeight: 800, fontSize: '18px', paddingTop: '20px' }}>{data.user_general.firstname} {data.user_general.lastname}</div>
                    <div style={{ display: 'flex', justifyContent: 'center', fontFamily: 'Roboto', fontWeight: 200, paddingBottom: '20px' }}>21 ans</div>
                    <Map />
                </div>
                <div style={{display: 'flex', flex: 2}}>
                    <ProfileInfos data={this.props.data}/>
                </div>
            </div>
        )
    }
}