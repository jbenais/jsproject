import React from 'react';
import Conversation from './Conversation';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
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
            user: this.props.data,
            matchesList: [],
            messages: [],
            opposite_user: null
        }
        this.fetchMatches = this.fetchMatches.bind(this);
        this.loadConversation = this.loadConversation.bind(this);
    }

    fetchMatches() {
        fetch('http://localhost:8888/matches/user/' + this.state.user.user_general.id, {
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

    loadConversation(opposite_user) {
        // FETCH DES MESSAGES
        this.setState({
            opposite_user: opposite_user
        })
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
                })
            })
    }
    render() {
        let matches = this.state.matchesList;
        const conversation = this.state.opposite_user !== null ? 
            <Conversation messages={this.state.messages} user={this.state.user} opposite_user={this.state.opposite_user}/>
            : <div style={{fontFamily: 'Roboto', fontWeight: 500, fontSize: '20px', color: 'grey'}}>Sélectionne une conversation</div>
        return (
            <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
                <div style={{ display: 'flex', flex: 2 }}>
                    <List style={{width: '100%'}}>
                        {matches.map((elt, id) => {
                            const pictures = elt.user_picture
                            return (
                                <ListItem key={id} button onClick={() => this.loadConversation(elt)}>
                                    <Avatar alt={elt.user_general.name} src={pictures.length === 0 ? placeholder : pictures[0].url} />
                                    <ListItemText style={{width: '100%'}} primary={elt.user_general.firstname} />
                                </ListItem>
                            )
                        })}
                    </List>
                </div>
                <div style={{ display: 'flex', flex: 4, padding: '50px' }}>
                    {conversation}
                </div>
            </div>
        )
    }
}