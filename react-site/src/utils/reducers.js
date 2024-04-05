const rootReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_AUTHORIZED':
            return {
                ...state,
                isAuthorized: action.payload
            };
        default:
            return state;
    }
};

export default rootReducer;
