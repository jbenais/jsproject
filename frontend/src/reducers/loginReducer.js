const initialState = {
    user_general: {
        id: 0,
        email: '',
        firstname: '',
        lastname: '',
        age: null,
        is_male: null,
        description: null,
        id_mbti: null,
        id_orientation: null,
        user_address: null,
        user_preference: [],
        user_target: []
    },
    user_picture: [
        {
            id: 0,
            id_user: 0,
            url: '',
            is_profile: true,
        }
    ],
    user_address: null,
    user_preference: [],
    user_target: [],
    is_logged : false,
   
};

const loginReducer = (state = initialState, action) => {
    console.log(action.payload);
	switch (action.type) {
		case 'LOGIN':
			state = {
                ...state,
                user_general: action.payload.user_general,
                user_picture: action.payload.user_picture,
                user_address: action.payload.user_address,
                user_preference: action.payload.user_preference,
                user_target: action.payload.user_target,
                is_logged: true,
			};
		break;
        
        case 'LOGOUT':
            state = initialState;
        break;
		
    }
	return state;
};

export default loginReducer;