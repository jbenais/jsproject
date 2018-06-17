import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { log } from 'util';

// JULIA : Display des matchs dans la liste qui se situe sur le coté gauche comme pour messenger
export default class MatchesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    // Get des personnes matchées
    // fetchMatches() {
    //     fetch('http://localhost:8888/matches/user/' + this.props.id, {
    //         method: 'GET',
    //         headers: {
    //             'ACCEPT': 'application/json, text/plain, */*',
    //             'Content-type': 'application/json'
    //         },
    //     })
    //         .then((resp) => resp.json())
    //         .then((response) => {
    //             this.setState({
    //                 matchesList: response.data
    //             })
    //             console.log(response);
    //         })
    // }

    componentWillMount() {
        console.log(this.props);
    }

    render() {
        /* Ici c'est là qu'il faut mettre le nom de la personne matché */
        return (
            <div>
                {/* <List>
                    {this.props.matchesList.map(elt => {
                        <ListItem button>
                            <ListItemText primary={elt.id}/>
                        </ListItem>
                    })}
                </List> */}
            </div>
        )
    }
}