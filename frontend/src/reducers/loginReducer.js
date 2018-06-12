const initialState = {
    login: '',
    token: '',
    email: '',
    name: '',
    isLogin: false,
};



const loginReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'LOGIN':
			state = {
                ...state,
                login: action.payload.login,
                token: action.payload.token,
                email: action.payload.email,
                name: action.payload.name,
                isLogin: true
			};
		break;
        
        case 'LOGOUT':
            state = initialState;
        break;
		
	}
	return state;
};

export default loginReducer;