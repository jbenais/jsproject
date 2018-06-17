import React from 'react';

export default class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const content = this.props.content;
        return (
            <div style={{display: 'flex'}}>
                {content}
            </div>
        )
        // Ajouter nom de la personne qui envoie + contenu du message via les props dans la div
    }
}