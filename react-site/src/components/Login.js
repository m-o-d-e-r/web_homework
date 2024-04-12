import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import "./Login.css"
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeAuthState } from '../utils/actions';
import { API_URL } from '../utils/config';


function Login() {
    const [GoToCatalog, setGoToCatalog] = React.useState(false);
    const dispatch = useDispatch();


    const handleSubmit = (e) => {
        e.preventDefault();
        const login = document.getElementById('login').value;
        const password = document.getElementById('password').value;

        if (login === '' || password === '') {
            alert('Please fill in all fields');
            return;
        }

        axios.post(
            `${API_URL}/users/login`,
            {
                "login": login,
                "password": password
            }
        ).then(res => {
            if (res.status === 200) {
                Cookies.set('access_token', res.data["access_token"]);
                Cookies.set('refresh_token', res.data["refresh_token"]);
                setGoToCatalog(true);
                dispatch(changeAuthState(true));
            }
        });

    };

    if (GoToCatalog) {
        return <Navigate to="/catalog" />
    }

    return (
        <div className="login_section">
            <form id="loginForm" className="login_form" onSubmit={handleSubmit}>
                <label className="login_form_label">Login</label><br />
                <input className="login_item" id="login" type="text" placeholder="Login" required /><br />
                <input className="login_item" id="password" type="password" placeholder="Password" required /><br />
                <input className="login_item reg_submit_button" type="submit" value="Login" />
            </form>
        </div>
    );
}


export default Login;
