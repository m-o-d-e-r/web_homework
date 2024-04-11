import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';


function Logout() {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");

    return <Navigate to="/" />
}

export default Logout;
