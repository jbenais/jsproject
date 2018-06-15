import React from 'react';
import Favorite from '@material-ui/icons/Favorite';
import Dislike from '@material-ui/icons/ThumbDown';
import Button from '@material-ui/core/Button';
export default class Matches extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usersMatched: [],
            users: [
                {
                    firstname: 'Julia',
                    profession: 'ÉTUDIANTE',
                    profile: 'ENFJ',
                    age: '18 ans',
                    description: 'Lorem Ipsum dolor je suis trop belle trop swag',
                },
                {
                    firstname: 'Lola',
                    profession: 'CUISINIÈRE',
                    profile: 'ENTJ',
                    age: '20 ans',
                    description: 'Lorem Ipsum dolor je n’ai pas besoin de description ma gueule je suis un cuisinier trop swag',
                },]
        }
    }

    removeFromList() {
        this.setState({
            users: this.state.users.splice(1, 1)
        })
    }

    addToMatched(user) {
        this.setState({
            usersMatched: this.state.usersMatched.push(this.state.users[0])
        })
        this.removeFromList();
    }

    render() {
        console.log(this.state.users);
        console.log('length: ' + this.state.users.length)
        if (this.state.users.length === 0) {
            return (
                <div style={{ display: 'flex', height: '100vh', justifyContent: 'center' }}>
                    POUR L'INSTANT PAS DE DONNÉES
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
                                    {this.state.users[0].firstname}
                                </div>
                                <div style={{ display: 'flex', color: '#F58180', fontFamily: 'Roboto', fontWeight: 500 }}>
                                    {this.state.users[0].profession.toUpperCase()}
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', fontFamily: 'Roboto', fontWeight: 300 }}>
                            <div style={{ display: 'flex' }}>
                                {this.state.users[0].profile}
                            </div>
                            <div style={{ display: 'flex' }}>
                                -
                       </div>
                            <div style={{ display: 'flex' }}>
                                {this.state.users[0].age}
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '30px' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', border: '1px solid #E6E6E6', borderRadius: '7px', padding: '10px' }}>
                                <div style={{ fontFamily: 'Roboto', fontWeight: 500, color: '#3E3E3E', fontSize: '20px' }}>
                                    DESCRIPTION
                            </div>
                                <div style={{ textAlign: 'center', fontFamily: 'Roboto', fontWeight: 300, color: '#3E3E3E', fontSize: '18px', padding: '30px' }}>
                                    {this.state.users[0].description}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '20px' }}>
                        <Button variant="fab" onClick={this.removeFromList.bind(this)} style={{ color: '#FF5D65', backgroundColor: 'white', boxShadow: 'none' }} aria-label="add">
                            <Dislike />
                        </Button>
                        <Button variant="fab" /*onClick={this.addToMatched(this.state.users[0])}*/ style={{ color: '#22D894', backgroundColor: 'white', boxShadow: 'none' }} aria-label="add">
                            <Favorite />
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}