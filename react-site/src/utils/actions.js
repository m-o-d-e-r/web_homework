
export const changeAuthState = (authorized) => {
    return {
        type: 'CHANGE_AUTHORIZED',
        payload: authorized
    };
};