import React from 'react';
import {connect} from 'react-redux'; 

class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const data = this.props.data;
        const name = data.id_sender === this.props.loginReducer.user_general.id ? this.props.loginReducer.user_general.firstname : this.props.name;
        return (
            <div style={{ display: 'flex', flexDirection: 'column', padding: '10px', borderBottom: '1px solid #E6E6E6' }}>
                <div>
                    {name} a envoyé :
                </div>
                <div style={{textAlign: 'center'}}>
                    <b>{data.content}</b>
                </div>
            </div>
        )
        // Ajouter nom de la personne qui envoie + contenu du message via les props dans la div
    }
}



const mapStateToProps = (state) => {
    return {
      loginReducer: state.loginReducer
    };
  };

  export default connect(mapStateToProps)(Message);