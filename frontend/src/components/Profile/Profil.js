import React from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Map from './Map';

const profiles = ['ENFJ', 'ENFP', 'ENTJ', 'ENTP',
    'ESFJ', 'ESFP', 'ESTJ', 'ESTP',
    'INFJ', 'INFP', 'INTJ', 'INTP',
    'ISFJ', 'ISFP', 'ISTJ', 'ISTP']

function valueFormatter(v) {
    return `${v} km`;
}

export default class Profil extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userProfile: 'ENFJ',
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(name) {
        return (event => {
            console.log(event.target.value);
            this.setState({
                [name]: event.target.value,
            })
        });
    }

    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', height: '30%' }}>
                        <img src="https://picsum.photos/200/300" />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', fontFamily: 'Roboto', fontWeight: 800, fontSize: '18px', paddingTop: '20px' }}>Julia BENAIS</div>
                    <div style={{ display: 'flex', justifyContent: 'center', fontFamily: 'Roboto', fontWeight: 200 }}>21 ans</div>
                    <TextField
                        id="select-currency-native"
                        select
                        label="Profil MBTI"
                        value={this.state.profile}
                        onChange={this.handleChange('profile')}
                        margin="normal"
                    >
                        {profiles.map(option => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </TextField>
                    <Map />
                </div>




                <div style={{ display: 'flex', flex: 3, flexDirection: 'column', backgroundColor: '#F8F8F8' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                        <div style={{ display: 'flex', fontFamily: 'Roboto', fontWeight: '700', fontSize: '18px', padding: '20px' }}>
                            Information principales
                        </div>
                        <div style={{ display: 'flex', fontFamily: 'Roboto', fontWeight: '700', fontSize: '18px', padding: '20px' }}>
                            Préférence Amoureuses
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                        <div style={{ display: 'flex', backgroundColor: 'white', flexDirection: 'column', padding: '30px', width: '45%' }}>
                            <TextField
                                value="Benais"
                                id="name"
                                label="Nom"
                                margin="normal"
                            />
                            <TextField
                                id="name"
                                label="Prénom"
                                value="Julia"
                                margin="normal"
                            />
                            <TextField
                                id="name"
                                label="Adresse mail"
                                value="benais.julia@gmail.com"
                                margin="normal"
                            />
                            <TextField
                                id="name"
                                label="Date de naissance"
                                value="04-11-1996"
                                type="date"
                                margin="normal"

                            />
                            <TextField
                                id="multiline-flexible"
                                label="Description"
                                multiline
                                rowsMax="4"
                                value="Bonjour, je m'appelle Julia"
                                margin="normal"
                            />

                            <TextField
                                id="select-currency-native"
                                select
                                label="Profil MBTI"
                                value={this.state.userProfile}
                                onChange={this.handleChange('userProfile')}
                                margin="normal"
                            >
                                {profiles.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </TextField>

                        </div>
                        <div style={{ display: 'flex', backgroundColor: 'white', flexDirection: 'column', padding: '30px', width: '45%', }}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Attirances sexuelles</FormLabel>
                                <FormGroup style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                onChange={this.handleChange}
                                                value="Femme"
                                            />
                                        }
                                        label="Femme"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                onChange={this.handleChange}
                                                value="Homme"
                                            />
                                        }
                                        label="Homme"
                                    />
                                </FormGroup>
                            </FormControl>
                            <SliderWithTooltip min={0} max={1000} step={50} tipFormatter={valueFormatter} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}