import axios from 'axios';
import Cookies from 'js-cookie';



function refreshAccessToken() {
    refresh_token = Cookies.get('refresh_token');

    if (typeof refresh_token == "undefined") {return false;}

    axios.post(
        `http://localhost:8080/users/refresh_token`,
        { headers: {"Authorization" : `Bearer ${refresh_token}`} }
    ).then(res => {
        if (res.status === 200) {
            Cookies.set('access_token', res.data["access_token"]);
            Cookies.set('refresh_token', res.data["refresh_token"]);
            return true;
        }
    });
    return false;
}

export const updateTokens = () => {
    access_token = Cookies.get('access_token');

    if (typeof access_token == "undefined") {
        return refreshAccessToken();
    }
    return true;
}
