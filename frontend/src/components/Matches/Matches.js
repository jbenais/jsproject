import React from 'react';
import Favorite from '@material-ui/icons/Favorite';
import Dislike from '@material-ui/icons/ThumbDown';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import MatchesAction from '../../actions/MatchesAction';
import { BounceLoader } from 'react-spinners';


class Matches extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usersToMatch: [],
            usersMatched: [{id_user: 1, id_user_love: 2}]
        }
    }

    componentDidMount() {

    }

    componentWillMount() {
        fetch('http://localhost:8888/user/' + this.props.id + '/users', {
			method: 'GET',
			headers: {
				'ACCEPT': 'application/json, text/plain, */*',
				'Content-type': 'application/json'
            },
		})
		.then((resp) => resp.json())
		.then((response) => {
			this.setState({
                usersToMatch: response.data
            })
        });    
    }
    
    
    removeFromList() {
        this.setState({
            usersToMatch: this.state.usersToMatch.splice(1, 1)
        })
    }

    addToMatched() {
        const userMatched = this.state.usersMatched[0];
        let data = {
            id_user: this.props.id,
            id_user_love: userMatched.id
        }
        this.props.match(data);
        /*this.setState({
            usersMatched: this.state.usersMatched.concat(this.state.usersToMatch[0])
        })*/
        this.removeFromList();
    }

    render() {
        return (
            <div>
            <Button variant="fab" onClick={this.addToMatched.bind(this)} style={{ color: '#22D894', backgroundColor: 'white', boxShadow: 'none' }} aria-label="add">
            <Favorite />
        </Button>
        </div>
        )
        /*if (this.state.usersToMatch.length === 0) {
            return (
                <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
                   <BounceLoader color={"#36D7B7"} loading={true}/>
                </div>
            )
        }
        return (
            <div style={{ display: 'flex', height: '100vh', flexDirection: 'column', padding: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', margin: '0 auto', width: '50%', }}>
                    <div style={{ backgroundColor: 'white', padding: '30px' }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <div style={{ display: 'flex', padding: '30px', flex: 2 }}>
                                <img id="img" width="140px" height="140px" src="https://picsum.photos/200/200" />
                            </div>
                            <div style={{ display: 'flex', flex: 3, flexDirection: 'column', justifyContent: 'center' }}>
                                <div style={{ display: 'flex', fontFamily: 'Roboto', fontWeight: 700, fontSize: '26px', color: '#55545E', letterSpacing: 1 }}>
                                    {this.state.usersToMatch[0].firstname}
                                </div>
                                <div style={{ display: 'flex', color: '#F58180', fontFamily: 'Roboto', fontWeight: 500 }}>
                                    {this.state.usersToMatch[0].profession.toUpperCase()}
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', fontFamily: 'Roboto', fontWeight: 300 }}>
                            <div style={{ display: 'flex' }}>
                                {this.state.usersToMatch[0].profile}
                            </div>
                            <div style={{ display: 'flex' }}>
                                -
                       </div>
                            <div style={{ display: 'flex' }}>
                                {this.state.usersToMatch[0].age}
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '30px' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', border: '1px solid #E6E6E6', borderRadius: '7px', padding: '10px' }}>
                                <div style={{ fontFamily: 'Roboto', fontWeight: 500, color: '#3E3E3E', fontSize: '20px' }}>
                                    DESCRIPTION
                            </div>
                                <div style={{ textAlign: 'center', fontFamily: 'Roboto', fontWeight: 300, color: '#3E3E3E', fontSize: '18px', padding: '30px' }}>
                                    {this.state.usersToMatch[0].description}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '20px' }}>
                        <Button variant="fab" onClick={this.removeFromList.bind(this)} style={{ color: '#FF5D65', backgroundColor: 'white', boxShadow: 'none' }} aria-label="add">
                            <Dislike />
                        </Button>
                        <Button variant="fab" onClick={() => this.addToMatched} style={{ color: '#22D894', backgroundColor: 'white', boxShadow: 'none' }} aria-label="add">
                            <Favorite />
                        </Button>
                    </div>
                </div>
            </div>
        )*/
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.matchesReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        update: (response) => {
            MatchesAction.match(response)(dispatch);
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Matches);