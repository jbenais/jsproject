const initialState = {
    data: {
        id: 0,
        id_user: 0,
        id_user_love: 0,
        is_matched: false
    }
}

const matchesReducer = (state = initialState, action) => {
    console.log(action.payload);
    switch (action.type) {
        case 'MATCH':
            state = {
                ...state,
                data: action.payload.data,
            };
            break;

    }
    return state;
};

export default matchesReducer;