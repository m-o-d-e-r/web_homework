import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import "./Registration.css";
import "./main-container.css"
import { Navigate } from 'react-router-dom';
import { API_URL } from '../utils/config';


function Registration() {
    const [GoToCatalog, setGoToCatalog] = React.useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();
        const login = document.getElementById('login').value;
        const email = document.getElementById('email').value;
        const phoneNumber = document.getElementById('phoneNumber').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (login === '' || email === '' || phoneNumber === '' || password === '' || confirmPassword === '') {
            alert('Please fill in all fields');
            return;
        }

        axios.post(
            `${API_URL}/users/registration`,
            {
                "login": login,
                "password": password
            }
        ).then(res => {
            if (res.status === 200) {
                Cookies.set('access_token', res.data["access_token"]);
                Cookies.set('refresh_token', res.data["refresh_token"]);
                setGoToCatalog(true);
            }
        });

    };

    if (GoToCatalog) {
        return <Navigate to="/catalog" />
    }

    return (
        <div className="main_container">
            <form id="registrationForm" className="registration_form" onSubmit={handleSubmit}>
                <label className="registration_form_label">Registration</label><br />
                <input id="login" className="registration_item" type="text" placeholder="Login" /><br />
                <input id="email" className="registration_item" type="email" placeholder="Email" /><br />
                <input id="phoneNumber" className="registration_item" type="tel" placeholder="Phone number" /><br />
                <input id="password" className="registration_item" type="password" placeholder="Password" /><br />
                <input id="confirmPassword" className="registration_item" type="password" placeholder="Confirm password" /><br />
                <input className="registration_item reg_submit_button" type="submit" value="Sign up" />
            </form>
        </div>
    );
}

export default Registration;
