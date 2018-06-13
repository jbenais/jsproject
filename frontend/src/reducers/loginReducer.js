const initialState = {
    id: 0,
    email: '',
    firstname: '',
    lastname: '',
    age: null,
    is_male: null,
    description: null,
    id_mbti: null,
    id_orientation: null
};



const loginReducer = (state = initialState, action) => {
    console.log(action.payload);
	switch (action.type) {
		case 'LOGIN':
			state = {
                ...state,
                id: action.payload.id,
                email: action.payload.email,
                firstname: action.payload.firstname,
                lastname: action.payload.lastname,
                age: action.payload.age,
                is_male: action.payload.is_male,
                description: action.payload.description,
                id_mbti: action.payload.is_mbti,
                id_orientation: action.payload.id_orientation
			};
		break;
        
        case 'LOGOUT':
            state = initialState;
        break;
		
    }
	return state;
};

export default loginReducer;