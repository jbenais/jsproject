import React from 'react';
import { log } from 'util';
import Message from './Message';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { DialogActions } from '@material-ui/core';
let socket = require('socket.io-client')('http://localhost:8888/');
// JULIA: Display des messages avec un input en bas et un event (bouton send / enter)
export default class Conversation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: "",
            messages: [],
            user: this.props.user,
            opposite_user: this.props.opposite_user,
        }
        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.setMessage = this.setMessage.bind(this);
    }

    componentDidMount() {
        socket.emit('enterRoom', {
            channel: this.state.opposite_user.channel
        });
        socket.on('message', this.setMessage);
        console.log(this.state.opposite_user.channel);
        fetch('http://localhost:8888/messages/channel/' + this.state.opposite_user.channel.id + 
              '/date/' + new Date().toISOString().slice(0, 19).replace('T', ' '), {
            method: 'GET',
            headers: {
                'ACCEPT': 'application/json, text/plain, */*',
                'Content-type': 'application/json'
            },
        })
            .then((resp) => resp.json())
            .then((response) => {
                this.setState({
                    messages: response.data
                })
            })
      }

    
      setMessage(data){
        this.setState({
            messages: this.state.messages.concat(data.messageDB)
        })
    }

    sendMessage() {
        const message = {
            content: this.state.content,
            content_type: 'message'
        }
        socket.emit('message', {
            message: message,
            user: this.state.user.user_general,
            opposite_user: this.state.opposite_user.user_general,
            channel: this.state.opposite_user.channel
        });
    }

    handleChange(name) {
        return event => {
            this.setState({
                [name]: event.target.value
            })
        } 
    }

    componentWillUnmount(){
        socket.emit('leaveRoom', {
            channel: this.state.opposite_user.channel
        })
    }

    render() {
        const user = this.props.user;
        const opposite_user = this.props.opposite_user;
        const messages = this.state.messages;
        return (
            <div style={{ display: 'flex', flexDirection: 'column', width: '80%', padding: '20px', border: '1px solid grey', borderRadius: '5px' }}>
                {messages.map((message, id) => {
                    return  (<Message key={id} name={this.state.opposite_user.user_general.firstname} data={message}/>)
                })}
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                    <TextField
                        id="multiline-flexible"
                        label="Message"
                        multiline
                        rowsMax="4"
                        onChange={this.handleChange('content')}
                        margin="normal"
                    />
                    <Button
                    disabled={this.state.content.length === 0}
                    style={{backgroundColor: '#01D2CB', color: 'white', borderRadius: '20px', height: '40px'}}
                     onClick={this.sendMessage}>Send</Button>
                </div>
            </div>
        )
    }
}