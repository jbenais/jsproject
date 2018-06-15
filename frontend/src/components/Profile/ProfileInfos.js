import React from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import * as LoginAction from '../../actions/LoginAction';
import Select from '@material-ui/core/Select';
import Settings from '@material-ui/icons/Settings';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import { connect } from "react-redux";
import Slider, { createSliderWithTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';
const SliderWithTooltip = createSliderWithTooltip(Slider);
const RangewithTooltip = createSliderWithTooltip(Slider.Range);


function valueFormatter(v) {
    return `${v} km`;
}

function ageFormatter(value) {
    return `${value}`;
}

class ProfileInfos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lastname: this.props.data.user_general.lastname,
            firstname: this.props.data.user_general.firstname,
            birthdate: this.props.data.user_general.birthdate ? (this.props.data.user_general.birthdate).split('T', 1)[0] : '01-01-2000',
            profession: this.props.data.user_general.profession,
            description: this.props.data.user_general.description,
            gender: this.props.data.user_general.is_male ? 'Homme' : 'Femme',
            maxDistance: this.props.data.user_general.max_distance,
            edit: false,
            profileList: [],
            orientation: this.props.data.user_general.id_orientation,
            userProfile: 'ENFJ',
            targetProfiles: [],
            ageRange: [this.props.data.user_general.age_min, this.props.data.user_general.age_max],
            gendersList: ['Femme', 'Homme'],
            targetsList: [],
            // This one corresponds to the chosen targets
            user_target: [],
            user_preferences: this.props.data.user_preferences
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleOrientationChange = this.handleOrientationChange.bind(this);
        this.editProfile = this.editProfile.bind(this);
        this.fetchDatas = this.fetchDatas.bind(this);
        this.onRangeChange = this.onRangeChange.bind(this);
        this.onAgeChange = this.onAgeChange.bind(this);
    }

    fillTargetProfile() {
        this.props.data.user_preferences.forEach(key => {
            let name = this.state.profileList.find(elt => {return elt.id == key.id_mbti}).name;
            this.state.targetProfiles.push(name);
        });
    }

    fetchDatas() {
        let fields = {
            'target': { 'state': 'targetsList', 'user': 'target', 'field': 'id_target' },
            'mbti': { 'state': 'profileList', 'user': 'userProfile', 'field': 'id_mbti' }
        };
        for (let key in fields) {
            fetch(`http://localhost:8888/` + key)
                .then((resp) => resp.json())
                .then((json) => {
                    let name = fields[key].state;
                    let user = fields[key].user;
                    if (this.props.data.user_general[fields[key].field]) {
                        this.setState({
                            [name]: json.data,
                            [user]: json.data.find(elt => { return elt.id == this.props.data.user_general[fields[key].field] }).name
                        });
                    }
                    else {
                        this.setState({
                            [name]: json.data,
                        });
                    }
                    this.fillTargetProfile()
                })
                .catch(function (error) {
                    console.log('Looks like there was a problem: \n', error);
                });
        }
    }

    handleChange(name) {
        return (event => {
                this.setState({
                    [name]: event.target.value,
                })
        });
    }
    handleChangeCheckbox(name) {
        return (event => {
            let elt = {
                "id_user": this.props.data.user_general.id,
                "id_target": this.state.targetsList.find(function(e) { return e.name == event.target.value }).id
            };
            if (event.target.checked) {
                this.state[name].push(elt);
            } else {
                let idx = -1;
                this.state[name].forEach((element, index) => {
                    if (element.id_target == elt.id_target)
                        idx = index;
                });
                if (idx != -1)
                    this.state[name].splice(idx, 1);
            }
        });
    }

    handleChangeMenuItem(name) {
        return (event => {
            this.setState({
                [name]: event.target.value,
            });
            let datas = [];
            event.target.value.forEach((elt, index) => {
                let idx = this.state.profileList.find(elm => { return elm.name == elt}).id
                datas.push({
                    "id_user": this.props.data.user_general.id,
                    "id_mbti": idx
                });
            });
            this.state.user_preferences = datas;
        });    
    }

    handleOrientationChange(id) {
        this.setState({
            orientation: id,
        });
    }

    handleTargetChange(id) {
    }

    onRangeChange(value) {
        this.setState({
            ageRange: value
        })
    }

    onAgeChange(value) {
        this.setState({
            maxDistance: value
        })
    }

    editProfile(value) {
        if (!value) {
            let data = {
                user_general: {
                    lastname: this.state.lastname,
                    firstname: this.state.firstname,
                    birthdate: this.state.birthdate,
                    userProfile: this.state.userProfile,
                    profession: this.state.profession,
                    description: this.state.description,
                    gender: this.state.gender,
                    is_male: this.state.gender !== 'Femme',
                    id_mbti: this.state.profileList.find(elt => { return elt.name == this.state.userProfile }).id,
                    id_orientation: this.state.orientation,
                    id_user: this.props.data.user_general.id,
                    max_distance: this.state.maxDistance,
                    age_min: this.state.ageRange[0],
                    age_max: this.state.ageRange[1]

                },
                user_address: {
                    id_user: this.props.data.user_general.id,
                    latitude: this.props.position.lat,
                    longitude: this.props.position.lng
                },
                user_preferences: this.state.user_preferences,
                user_target: this.state.user_target

            }
            console.log(data);
            this.props.update(data);
        }
        this.setState({
            edit: value
        })
    }

    componentWillMount() {
        this.fetchDatas();
    }

    render() {        
        return (
            <div style={{ display: 'flex', flex: 3, flexDirection: 'column', }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px' }}>
                    <div style={{}}>
                        <Button onClick={() => this.editProfile(true)}>
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
                            value={this.state.lastname}
                            onChange={this.handleChange('lastname')}
                            id="name"
                            label="Nom"
                            margin="normal"
                        />
                        <TextField
                            disabled={!this.state.edit}
                            id="name"
                            label="Prénom"
                            value={this.state.firstname}
                            onChange={this.handleChange('firstname')}
                            margin="normal"
                        />

                        <TextField
                            id="select-gender-native"
                            select
                            label="Sexe"
                            disabled={!this.state.edit}
                            value={this.state.gender}
                            onChange={this.handleChange('gender')}
                            margin="normal"
                        >
                            {this.state.gendersList.map(option => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </TextField>

                        <TextField
                            disabled={!this.state.edit}
                            id="name"
                            label="Date de naissance"
                            onChange={this.handleChange('birthdate')}
                            value={this.state.birthdate}
                            type="date"
                            margin="normal"

                        />
                        <TextField
                            disabled={!this.state.edit}
                            id="name"
                            label="Profession"
                            value={this.state.profession}
                            onChange={this.handleChange('profession')}
                            margin="normal"
                        />
                        <TextField
                            disabled={!this.state.edit}
                            id="multiline-flexible"
                            label="Description"
                            onChange={this.handleChange('description')}
                            multiline
                            rowsMax="4"
                            value={this.state.description}
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
                            {this.state.profileList.map(option => (
                                <option key={option.id} value={option.name}>
                                    {option.name}
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
                                            checked={this.state.orientation === 2}
                                            style={{ color: '#01D2CB' }}
                                            disabled={!this.state.edit}
                                            onChange={() => this.handleOrientationChange(2)}
                                        />
                                    }
                                    label={'Femme'}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={this.state.orientation === 1}
                                            style={{ color: '#01D2CB' }}
                                            disabled={!this.state.edit}
                                            onChange={() => this.handleOrientationChange(1)}
                                        />
                                    }
                                    label={'Homme'}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={this.state.orientation === 3}
                                            style={{ color: '#01D2CB' }}
                                            disabled={!this.state.edit}
                                            onChange={() => this.handleOrientationChange(3)}
                                        />
                                    }
                                    label={'Les deux'}
                                />
                            </FormGroup>
                        </FormControl>


                        <div style={{ display: 'flex', fontFamily: 'Roboto', color: "#757575", fontWeight: 400, paddingTop: '20px', paddingBottom: '40px' }}>
                            Maximum Distance
                            </div>

                        <SliderWithTooltip
                            onChange={this.onAgeChange}
                            value={this.state.maxDistance}
                            style={{ marginBottom: '20px' }}
                            min={0}
                            max={1000}
                            step={50}
                            tipProps={{ visible: true }}
                            disabled={!this.state.edit} tipFormatter={valueFormatter} />

                        <FormControl style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '20px' }}>
                            <InputLabel htmlFor="select-multiple-chip">Préférences MBTI</InputLabel>
                            <Select
                                multiple={true}
                                disabled={!this.state.edit}
                                value={this.state.targetProfiles}
                                onChange={this.handleChangeMenuItem('targetProfiles')}
                                input={<Input id="select-multiple-chip" />}
                                renderValue={selected => (
                                    <div>
                                        {selected.map(value => <Chip key={value} label={value.name} />)}
                                    </div>
                                )}
                            >
                                {this.state.profileList.map(profile => (
                                    <MenuItem
                                        key={profile.id}
                                        value={profile.name}>
                                        {profile.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>


                        <FormControl component="fieldset">
                            <FormLabel component="legend">Type(s) de relation souhaitée</FormLabel>
                            <FormGroup style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                { this.state.targetsList.map((elt) => (
                                        <FormControlLabel
                                            key={elt.id}
                                            control={
                                                <Checkbox
                                                    style={{ color: '#01D2CB' }}
                                                    disabled={!this.state.edit}
                                                    onChange={this.handleChangeCheckbox('user_target')}
                                                    value={elt.name}
                                                />
                                            }
                                            label={elt.name}
                                        />
                                ))}
                            </FormGroup>
                        </FormControl>

                        <div style={{ display: 'flex', fontFamily: 'Roboto', color: "#757575", fontWeight: 400, paddingTop: '20px', paddingBottom: '40px' }}>
                            Age Range
                            </div>
                        <RangewithTooltip
                            disabled={!this.state.edit}
                            allowCross={false}
                            count={2} min={18}
                            max={65} step={1}
                            defaultValue={[18, 25]}
                            value={this.state.ageRange}
                            onChange={this.onRangeChange}
                            tipFormatter={ageFormatter}
                            tipProps={{ visible: true }}
                            style={{ marginBottom: '20px' }}
                        />
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        onClick={() => this.editProfile(false)}
                        variant="contained"
                        style={{ visibility: (this.state.edit ? 'visible' : 'hidden'), width: '400px', fontFamily: 'Roboto', color: 'white', backgroundColor: '#01D2CB', borderRadius: '20px', fontSize: '18px', letterSpacing: '1px', margin: '30px' }}
                    >VALIDER</Button>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        update: (response) => {
            LoginAction.update(response)(dispatch);
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileInfos);