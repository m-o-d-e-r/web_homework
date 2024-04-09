
export const changeAuthState = (authorized) => {
    return {
        type: 'CHANGE_AUTHORIZED',
        payload: authorized
    };
};

export const changeToAdmin = (is_admin) => {
    return {
        type: 'CHANGE_TO_ADMIN',
        payload: is_admin
    };
};