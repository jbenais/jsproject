import React from 'react';
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
            content: [],
            // messages: [],
            user: this.props.user,
            opposite_user: this.props.opposite_user,
        }
        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);

    }

    componentDidMount() {
        socket.emit('enterRoom', {
            channel: this.state.opposite_user.channel
        });
        socket.on('message', function(data){
            const {messageDB} = data;
            alert(`${messageDB.sender_name} said ${messageDB.content}`);
            // this.setState({
            //     messages: messages.push({content: data.content})
            // })
        });
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
        return (
            <div style={{ display: 'flex', flexDirection: 'column', width: '80%', padding: '20px', border: '1px solid grey', borderRadius: '5px' }}>
                {/* {messages.map((message) => {
                    return <Message key={message}/>
                })} */}
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                    <TextField
                        id="multiline-flexible"
                        label="Message"
                        multiline
                        rowsMax="4"
                        onChange={this.handleChange('content')}
                        margin="normal"
                    />
                    <Button onClick={this.sendMessage}>Send</Button>
                </div>
            </div>
        )
    }
}