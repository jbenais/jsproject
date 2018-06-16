import React from 'react';
import { connect } from "react-redux";
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
            targetValues: [],
            ageRange: [this.props.data.user_general.age_min, this.props.data.user_general.age_max],
            gendersList: ['Femme', 'Homme'],
            targetsList: [],

            user_target: this.props.data.user_target,
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
            let name = this.state.profileList.find(elt => { return elt.id == key.id_mbti }).name;
            let id = this.state.profileList.find(elt => { return elt.id == key.id_mbti }).id;
            this.state.targetProfiles.push(name);
        });
        this.props.data.user_target.forEach(key => {
            let name = this.state.targetsList.find(elt => { return elt.id == key.id_target }).name;
            let id = this.state.targetsList.find(elt => { return elt.id == key.id_target }).id;
            this.state.targetValues.push(name);
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


    handleChangeMenuItem(name, idname, state_value, list) {
        return (event => {
            this.setState({
                [name]: event.target.value,
            });
            let datas = [];
            console.log(this.state[name]);
            event.target.value.forEach((elt, index) => {
                let idx = this.state[list].find(elm => { return elm.name == elt }).id
                datas.push({
                    "id_user": this.props.data.user_general.id,
                    [idname]: idx
                });
            });
            this.state[state_value] = datas;
        });
    }

    handleOrientationChange(id) {
        this.setState({
            orientation: id,
        });
    }

    handleTargetChange(elm) {
        console.log(elm);
        return (event => {
            let elt = {
                "id_user": this.props.data.user_general.id,
                "id_target": this.state.targetsList.find(function (e) { return e.name == elm.name }).id
            }
            if (event.target.checked) {
                this.setState({
                    user_target: user_target.concat(elt)
                })
            } else {
                let idx = -1;
                this.state.user_target.forEach((element, index) => {
                    if (element.id_target == elt.id_target)
                        idx = index;
                });
                if (idx != -1) {
                    this.setState({
                        user_target: this.state.user_target.splice(idx, 1)
                    })
                }
            }
        })

        let target = this.state.user_target.find(elm => elm.id === elt.id)
        if (target == undefined) {
            this.setState({
                user_target: this.state.user_target.concat({ id: this.props.data.user_general.id, id_target: elt.id })
            })
        }
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

    testfun() {
        console.log(this.state.targetProfiles);
        return this.state.targetProfiles;
    }

    editProfile(value) {
        console.log(this.state.user_target);
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
                user_address: this.props.position.lat !== null && this.props.position.lng !== null ? {
                    id_user: this.props.data.user_general.id,
                    latitude: this.props.position.lat,
                    longitude: this.props.position.lng
                } : null,
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
            <div className="profile-infos-content">
                <div className="button-edit">
                    <div>
                        <Button onClick={() => this.editProfile(true)}>
                            <Settings />
                        </Button>
                    </div>
                </div>
                <div className="main-infos-content">
                    <div className="main-infos-background">
                        <div className="main-infos-header">
                            <div id="hexagon">
                                <span>✓</span>
                            </div>
                            <div className="main-infos-text">
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

                    <div className="dating-infos-container">
                        <div className="dating-infos-background">
                            <div id="hexagon">
                                <span>✓</span>
                            </div>
                            <div className="dating-infos-text">
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


                        <div className="max-distance-text">
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
                                onChange={this.handleChangeMenuItem('targetProfiles', 'id_mbti', 'user_preferences', 'profileList')}
                                input={<Input id="select-multiple-chip" />}
                                renderValue={selected => (
                                    <div>
                                        {selected.map(value => <Chip key={value} label={value} />)}
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
                        <FormControl style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '20px' }}>
                            <InputLabel htmlFor="select-multiple-chip">Types de relation souhaités</InputLabel>
                            <Select
                                multiple={true}
                                disabled={!this.state.edit}
                                value={this.state.targetValues}
                                onChange={this.handleChangeMenuItem('targetValues', 'id_target', 'user_target', 'targetsList')}
                                input={<Input id="select-multiple-chip" />}
                                renderValue={selected => (
                                    <div>
                                        {selected.map(value => <Chip key={value} label={value} />)}
                                    </div>
                                )}
                            >
                                {this.state.targetsList.map(profile => (
                                    <MenuItem
                                        key={profile.id}
                                        value={profile.name}>
                                        {profile.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        
                        <div className="age-range-text">
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

