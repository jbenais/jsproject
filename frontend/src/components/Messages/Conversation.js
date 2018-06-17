import React from 'react';
import Message from './Message';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// JULIA: Display des messages avec un input en bas et un event (bouton send / enter)
export default class Conversation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: []
        }
        this.handleChange = this.handleChange.bind(this);
    }


    sendMessage() {
            // REQUÊTE POUR ENVOYER MESSAGE
    }

    handleChange(name) {
        return event => {
            this.setState({
                [name]: event.target.value
            })
        } 
    }

    render() {
        let messages = this.props.messages;
        return (
            <div style={{ display: 'flex', flexDirection: 'column', width: '80%', padding: '20px', border: '1px solid grey', borderRadius: '5px' }}>
                {messages.map((msg, id) => {
                    return <Message key={key}/* rajouter messages.data pour avoir les données du message */ />
                })}
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                    <TextField
                        id="multiline-flexible"
                        label="Message"
                        multiline
                        rowsMax="4"
                        onChange={this.handleChange('content')}
                        margin="normal"
                    />
                    <Button onClick={this.sendMessage()}>Send</Button>
                </div>
            </div>
        )
    }
}