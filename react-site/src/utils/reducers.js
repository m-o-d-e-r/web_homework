const rootReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_AUTHORIZED':
            return {
                ...state,
                isAuthorized: action.payload
            };
        case 'CHANGE_TO_ADMIN':
            return {
                ...state,
                isAdmin: action.payload
            };
        default:
            return state;
    }
};

export default rootReducer;
