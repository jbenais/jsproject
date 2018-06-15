import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


export default class MatchesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    
    render() {
        return (
            <div>
                <List>
                        <ListItem button>
                            <ListItemText primary="Nom" />
                        </ListItem>
                        <ListItem button component="a">
                            <ListItemText primary="Nom2" />
                        </ListItem>
                    </List>
                </div>
        )
    }
}