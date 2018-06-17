import React from 'react';

export default class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const data = this.props.data;
        console.log("data");
        console.log(data);
        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div>
                    {data.sender_name} a envoyé :
                </div>
                <div style={{textAlign: 'center'}}>
                    <b>{data.content}</b>
                </div>
            </div>
        )
        // Ajouter nom de la personne qui envoie + contenu du message via les props dans la div
    }
}