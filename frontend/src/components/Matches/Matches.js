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
            profilesList: [],
        }
        this.fetchMatches = this.fetchMatches.bind(this);
        this.fetchProfiles = this.fetchProfiles.bind(this);
        this.removeFromList = this.removeFromList.bind(this);
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
                this.setState({
                    profilesList: response.data
                })
            })
    }
    fetchMatches() {
        fetch('http://localhost:8888/user/' + this.props.data.id + '/users', {
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
            })
    }

    componentWillMount() {
        this.fetchMatches();
        this.fetchProfiles();
    }


    removeFromList() {
        this.setState({
            usersToMatch: this.state.usersToMatch.splice(0, 1)
        })
    }

    addToMatched(liked) {
        const userMatched = this.state.usersToMatch[0];
        const res = {
            user_matches: {
                id_user: this.props.data.id,
                id_opposite_user: userMatched.user_general.id,
                is_liked: liked
            }
        }
        fetch('http://localhost:8888/matches', {
            method: 'POST',
            headers: {
                'ACCEPT': 'application/json, text/plain, */*',
                'Content-type': 'application/json'
            },
            body: 
            JSON.stringify({
                user_matches: {
                    id_user: this.props.data.id,
                    id_opposite_user: userMatched.user_general.id,
                    is_liked: liked
                }
            })
        })
        .then(resp => resp.json())
        .then((response) => {
                console.log("response from match");
                console.log(response.data);
                this.removeFromList();
        })
        .catch((res) => console.log(res))
    }

    render() {
        const completed = this.props.data.is_completed;
        if (this.state.usersToMatch.length === 0) {
            this.interval = setInterval(this.fetchMatches, 15000);
            return (

                <div className="loading">
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        {completed ? "Nous recherchons des profils compatibles autour de vous..."
                        : "Veuillez terminer de configurer votre profil" }
                    </div>
                    <BounceLoader color={"#36D7B7"} loading={true} />
                </div>
            )
        } else {
            clearInterval(this.interval);
            let currentUser = this.state.usersToMatch[0];
            console.log("current user infos");
            console.log(currentUser);
            let birthdate = calculageAge(currentUser.user_general.birthdate);
            const profile = this.state.profilesList.find(elt => currentUser.user_general.id_mbti === elt.id)
            const profileName = profile ? profile.name : "N/A"
            return (
                <div className="matches-content">
                    <div className="current-match-content">
                        <div className="match-background">
                            <div className="match-main-content">
                                <div className="match-img">
                                    <img id="img" width="140px" height="140px" src="https://picsum.photos/200/300"/>
                                </div>
                                <div className="match-main-infos">
                                    <div className="match-firstname">
                                        {currentUser.user_general.firstname}
                                    </div>
                                    <div style={{display: 'flex'}}>
                                        <div className="match-profession">
                                            Profession: 
                                        </div>
                                        <div className="match-profession-value">
                                            {currentUser.user_general.profession === null ? "Non communiqué" : currentUser.user_general.profession}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="match-other-content">
                                <div style={{ display: 'flex' }}>
                                    MBTI: {profileName}
                                </div>
                                <div style={{ display: 'flex' }}>
                                    -
                                </div>
                                <div style={{ display: 'flex' }}>
                                    Age: {birthdate ? `${birthdate} ans` : 'Age non communiqué'}
                                </div>
                            </div>
                            <div className="match-description-content">
                                <div className="match-description" style={{border: '1px solid #E6E6E6'}}>
                                    <div className="description">
                                        DESCRIPTION
                                    </div>
                                    <div className="description-value">
                                        {currentUser.user_general.description === null ? "Pas de description" : currentUser.user_general.description}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="matches-buttons">
                            <Button variant="fab"
                                    onClick={() => this.addToMatched(false)}
                                    style={{ color: '#FF5D65', backgroundColor: 'white', boxShadow: 'none' }}
                                    aria-label="add">
                                <Dislike />
                            </Button>
                            <Button variant="fab"
                            onClick={() => this.addToMatched(true)}
                            style={{ color: '#22D894', backgroundColor: 'white', boxShadow: 'none' }}
                            aria-label="add">
                                <Favorite />
                            </Button>
                        </div>
                    </div>
                </div>
            )
        }
    }
}


