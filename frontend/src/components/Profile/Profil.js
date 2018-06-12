import React from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Icon from '@material-ui/core/Icon';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Settings from '@material-ui/icons/Settings';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Map from './Map';
import Slider, { Range, createSliderWithTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';
const SliderWithTooltip = createSliderWithTooltip(Slider);
const RangewithTooltip = createSliderWithTooltip(Slider.Range);

const profiles = ['ENFJ', 'ENFP', 'ENTJ', 'ENTP',
    'ESFJ', 'ESFP', 'ESTJ', 'ESTP',
    'INFJ', 'INFP', 'INTJ', 'INTP',
    'ISFJ', 'ISFP', 'ISTJ', 'ISTP']

function valueFormatter(v) {
    return `${v} km`;
}

function ageFormatter(value) {
    return `${value}`;
}

export default class Profil extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userProfile: 'ENFJ',
            targetProfiles: [],
            edit: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChipChange = this.handleChipChange.bind(this);
        this.editProfile = this.editProfile.bind(this);
    }

    handleChange(name) {
        return (event => {
            this.setState({
                targetProfiles: event.target.value,
            })
        });
    }

    handleChipChange(event) {
        this.setState({
            targetProfiles: event.target.value,
        })
    }

    editProfile() {
        this.setState({
            edit: true
        })
    }


    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'row', padding: '20px' }}>
                <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', height: '30%' }}>
                        <img id="img" src="https://picsum.photos/200/300" />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', fontFamily: 'Roboto', fontWeight: 800, fontSize: '18px', paddingTop: '20px' }}>Julia BENAIS</div>
                    <div style={{ display: 'flex', justifyContent: 'center', fontFamily: 'Roboto', fontWeight: 200, paddingBottom: '20px' }}>21 ans</div>
                    <Map />
                </div>

                <div style={{ display: 'flex', flex: 3, flexDirection: 'column', }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px' }}>
                        <div style={{}}>
                        <Button onClick={() => this.editProfile()}>
                            <Settings />
                        </Button>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', backgroundColor: 'white', flexDirection: 'column', padding: '20px', width: '45%' }}>

                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                <div id="hexagon">
                                    <span>✓</span>
                                </div>
                                <div style={{ display: 'flex', fontFamily: 'Roboto', fontWeight: '700', fontSize: '18px', color: '#4C4C4C' }}>
                                    Information principales
                                </div>
                            </div>
                            <TextField
                                disabled={!this.state.edit}
                                value="Benais"
                                id="name"
                                label="Nom"
                                margin="normal"
                            />
                            <TextField
                                disabled={!this.state.edit}
                                id="name"
                                label="Prénom"
                                value="Julia"
                                margin="normal"
                            />
                            <TextField
                                disabled={!this.state.edit}
                                id="name"
                                label="Adresse mail"
                                value="benais.julia@gmail.com"
                                margin="normal"
                            />
                            <TextField
                                disabled={!this.state.edit}
                                id="name"
                                label="Date de naissance"
                                value="04-11-1996"
                                type="date"
                                margin="normal"

                            />
                            <TextField
                                disabled={!this.state.edit}
                                id="multiline-flexible"
                                label="Description"
                                multiline
                                rowsMax="4"
                                value="Bonjour, je m'appelle Julia"
                                margin="normal"
                            />

                            <TextField
                                disabled={!this.state.edit}
                                id="name"
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

                        <div style={{ display: 'flex', backgroundColor: 'white', flexDirection: 'column', padding: '20px', width: '45%', }}>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: '30px' }}>
                                <div id="hexagon">
                                    <span>✓</span>
                                </div>
                                <div style={{ display: 'flex', fontFamily: 'Roboto', fontWeight: '700', fontSize: '18px', color: '#4C4C4C', marginBottom: '20px' }}>
                                    Préférences Amoureuses
                            </div>
                            </div>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Attirances sexuelles</FormLabel>
                                <FormGroup style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                disabled={!this.state.edit}
                                                onChange={this.handleChange}
                                                value="Femme"
                                            />
                                        }
                                        label="Femme"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                disabled={!this.state.edit}
                                                onChange={this.handleChange}
                                                value="Homme"
                                            />}
                                        label="Homme"
                                    />
                                </FormGroup>
                            </FormControl>
                            <div style={{ display: 'flex', fontFamily: 'Roboto', color: "#757575", fontWeight: 400, paddingTop: '20px', paddingBottom: '40px' }}>
                                Maximum Distance
                            </div>
                            <SliderWithTooltip style={{ marginBottom: '20px' }} min={0} max={1000} step={50} tipProps={{ visible: true }} disabled={!this.state.edit} tipFormatter={valueFormatter} />



                            <FormControl style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '20px' }}>
                                <InputLabel htmlFor="select-multiple-chip">Préférences MBTI</InputLabel>
                                <Select
                                    multiple
                                    disabled={!this.state.edit}
                                    value={this.state.targetProfiles}
                                    onChange={this.handleChipChange}
                                    input={<Input id="select-multiple-chip" />}
                                    renderValue={selected => (
                                        <div>
                                            {selected.map(value => <Chip key={value} label={value} />)}
                                        </div>
                                    )}
                                >
                                    {profiles.map(name => (
                                        <MenuItem
                                            key={name}
                                            value={name}>
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <div style={{ display: 'flex', fontFamily: 'Roboto', color: "#757575", fontWeight: 400, paddingTop: '20px', paddingBottom: '40px' }}>
                                Age Range
                            </div>
                            <RangewithTooltip
                                disabled={!this.state.edit}
                                allowCross={false}
                                count={2} min={18}
                                max={55} step={1}
                                defaultValue={[18, 25]}
                                tipFormatter={ageFormatter}
                                tipProps={{ visible: true }}
                                style={{ marginBottom: '20px' }}
                            />

                        </div>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <Button
                            variant="contained"
                            style={{ visibility: (this.state.edit ? 'visible' : 'hidden'), width: '400px', fontFamily: 'Roboto', color: 'white', backgroundColor: '#01D2CB', borderRadius: '20px', fontSize: '18px', letterSpacing: '1px', margin: '30px' }}
                        >VALIDER</Button>
                    </div>
                </div>
            </div>
        )
    }
}