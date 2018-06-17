import React from 'react';
import Conversation from './Conversation';
import MatchesList from './MatchesList';

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
            matchesList: []
        }
        this.fetchMatches = this.fetchMatches.bind(this);
    }

    fetchMatches() {
        fetch('http://localhost:8888/matches/user/' + this.props.id, {
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
                console.log(response);
            })
    }

    componentWillMount() {
        this.fetchMatches()
    }


    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <div style={{display: 'flex', flex: 1}}>
                    <MatchesList id={this.props.id} matchesList={[]} />
                </div>
                <div style={{display: 'flex', flex: 4}}>
                    {/* <Conversation/> */}
                </div>
            </div>
        )
    }
}