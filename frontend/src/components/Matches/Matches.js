import React from 'react';
import Favorite from '@material-ui/icons/Favorite';
import Dislike from '@material-ui/icons/ThumbDown';
import Button from '@material-ui/core/Button';
import { BounceLoader } from 'react-spinners';

function calculageAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

export default class Matches extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usersToMatch: [],
            usersMatched: [],
            profilesList: [],
        }
        this.fetchMatches = this.fetchMatches.bind(this);
        this.fetchProfiles = this.fetchProfiles.bind(this);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    fetchProfiles() {
        fetch('http://localhost:8888/mbti', {
            method: 'GET',
            headers: {
                'ACCEPT': 'application/json, text/plain, */*',
                'Content-type': 'application/json'
            },
        })
            .then((resp) => resp.json())
            .then((response) => {
                console.log('reponse');
                console.log(response);
                this.setState({
                    profilesList: response.data
                })
            })
    }
    fetchMatches() {
        fetch('http://localhost:8888/user/' + this.props.id + '/users', {
            method: 'GET',
            headers: {
                'ACCEPT': 'application/json, text/plain, */*',
                'Content-type': 'application/json'
            },
        })
            .then((resp) => resp.json())
            .then((response) => {
                console.log('reponse');
                console.log(response);
                this.setState({
                    usersToMatch: response.data
                })
            })
    }

    componentWillMount() {
        this.fetchMatches();
        this.fetchProfiles();
    }


    removeFromList() {

    }

    addToMatched(liked) {
        const userMatched = this.state.usersToMatch[0];
        const res = {
            user_matches: {
                id_user: this.props.id,
                id_opposite_user: userMatched.user_general.id,
                is_liked: liked
            }
        }
        console.log('res');
        console.log(res);
        fetch('http://localhost:8888/matches', {
            method: 'POST',
            headers: {
                'ACCEPT': 'application/json, text/plain, */*',
                'Content-type': 'application/json'
            },
            body: {
                user_matches: {
                    id_user: this.props.id,
                    id_opposite_user: userMatched.id,
                    is_liked: liked
                }
            }
        })
        .then((resp) => resp.json())
            .then((response) => {
                console.log(response);
            })
        .catch((res) => console.log(res))
        //this.removeFromList();
    }

    render() {
        if (this.state.usersToMatch.length === 0) {
            this.interval = setInterval(this.fetchMatches, 5000);
            return (
                <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
                    <BounceLoader color={"#36D7B7"} loading={true} />
                </div>
            )
        } else {
            clearInterval(this.interval);
            let currentUser = this.state.usersToMatch[0];
            let birthdate = calculageAge(currentUser.user_general.birthdate);
            let profile = this.state.profilesList.find(elt => currentUser.user_general.id_mbti === elt.id).name
            return (
                <div style={{ display: 'flex', height: '100vh', flexDirection: 'column', padding: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', margin: '0 auto', width: '50%', }}>
                        <div style={{ backgroundColor: 'white', padding: '30px' }}>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <div style={{ display: 'flex', padding: '30px', flex: 1 }}>
                                    <img id="img" width="140px" height="140px" src="https://picsum.photos/200/300"/>
                                </div>
                                <div style={{ display: 'flex', flex: 3, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', fontFamily: 'Roboto', fontWeight: 700, fontSize: '26px', color: '#55545E', letterSpacing: 1 }}>
                                        {currentUser.user_general.firstname}
                                    </div>
                                    <div style={{ display: 'flex', color: '#F58180', fontFamily: 'Roboto', fontWeight: 500 }}>
                                        Profession: {currentUser.user_general.profession === null ? "Non communiqué" : currentUser.user_general.profession}
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', fontFamily: 'Roboto', fontWeight: 300 }}>
                                <div style={{ display: 'flex' }}>
                                    {profile}
                                </div>
                                <div style={{ display: 'flex' }}>
                                    -
                                </div>
                                <div style={{ display: 'flex' }}>
                                    {birthdate ? `${birthdate} ans` : 'Age non communiqué'}
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '30px' }}>
                                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', border: '1px solid #E6E6E6', borderRadius: '7px', padding: '10px', width: '90%' }}>
                                    <div style={{ fontFamily: 'Roboto', fontWeight: 500, color: '#3E3E3E', fontSize: '20px' }}>
                                        DESCRIPTION
                            </div>
                                    <div style={{ textAlign: 'center', fontFamily: 'Roboto', fontWeight: 300, color: '#3E3E3E', fontSize: '18px', padding: '30px' }}>
                                        {currentUser.user_general.description === null ? "Pas de description" : currentUser.user_general.description}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '20px' }}>
                            <Button variant="fab" onClick={() => this.addToMatched(false)} style={{ color: '#FF5D65', backgroundColor: 'white', boxShadow: 'none' }} aria-label="add">
                                <Dislike />
                            </Button>
                            <Button variant="fab" onClick={() => this.addToMatched(true)} style={{ color: '#22D894', backgroundColor: 'white', boxShadow: 'none' }} aria-label="add">
                                <Favorite />
                            </Button>
                        </div>
                    </div>
                </div>
            )
        }
    }
}


