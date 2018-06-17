import React from 'react';
import Conversation from './Conversation';
import { bindActionCreators } from '../../../../../../Library/Caches/typescript/2.9/node_modules/redux';
import { log } from 'util';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import placeholder from '../../../static/images/placeholder.png';


// JULIA : Get tout les matchs dans component parent de la messagerie
// Tu passes toutes les infos du user courant + les infos du user avec qui tu veux parler
// selon un event onclick list des matches (comme messenger)

// user : TOUTE les infos du user courant
// userOpposite: Toute les infos du user avec qui tu veux discuter, tu chopes ces infos de la liste des matchs)
// J'ai bsn de Conversion(user, userOpposite)
export default class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            matchesList: [],
            messages: []
        }
        this.fetchMatches = this.fetchMatches.bind(this);
        this.loadConversation = this.loadConversation.bind(this);
    }

    fetchMatches() {
        fetch('http://localhost:8888/matches/user/' + this.state.data.user_general.id, {
            method: 'GET',
            headers: {
                'ACCEPT': 'application/json, text/plain, */*',
                'Content-type': 'application/json'
            },
        })
            .then((resp) => resp.json())
            .then((response) => {
                this.setState({
                    matchesList: response.data
                })
            })
    }

    componentWillMount() {
        this.fetchMatches()
    }

    loadConversation() {
        // FETCH DES MESSAGES
        fetch('', {
            method: 'GET',
            headers: {
                'ACCEPT': 'application/json, text/plain, */*',
                'Content-type': 'application/json'
            },
        })
            .then((resp) => resp.json())
            .then((response) => {
                this.setState({
                    // MICKA : TU SET ICI messages à ce que te renvoie la requête
                    //messages: response.data
                })
            })
    }
    render() {
        let matches = this.state.matchesList;
        return (
            <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
                <div style={{ display: 'flex', flex: 2 }}>
                    <List>
                        {matches.map(elt => {
                            const pictures = elt.user_picture
                            return (
                                <ListItem
                                    button
                                    onClick={() => this.loadConversation()}
                                >
                                    <Avatar alt={elt.user_general.name} src={pictures.length === 0 ? placeholder : pictures[0].url} />
                                    <ListItemText primary={elt.user_general.firstname} />
                                </ListItem>
                            )
                        })}
                    </List>
                </div>
                <div style={{ display: 'flex', flex: 4, padding: '20px' }}>
                    <Conversation messages={this.state.messages} />
                </div>
            </div>
        )
    }
}