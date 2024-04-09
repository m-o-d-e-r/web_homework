import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import { changeAuthState } from '../utils/actions';


function AuthState() {
    const isAuthorized = useSelector(state => state.isAuthorized);
    const access_token = Cookies.get('access_token');
    const dispatch = useDispatch();
    const [error, setError] = useState(false);


    useEffect(() => {
        if (typeof access_token === "undefined") {
            dispatch(changeAuthState(false));
        } else {
            axios.get(
                `http://localhost:8080/users/verify_token`,
                { headers: { "Authorization": `Bearer ${access_token}` } }
            ).then(res => {
                if (res.status === 200) {
                    dispatch(changeAuthState(true));
                } else {
                    setError(true);
                    dispatch(changeAuthState(false));
                }
            }).catch(function (err) {
                setError(true);
                dispatch(changeAuthState(false));
            });
        }

        if (error === true) {
            const refresh_token = Cookies.get('refresh_token');

            if (typeof refresh_token !== "undefined") {
                axios.get(
                    `http://localhost:8080/users/refresh_token`,
                    { headers: { "Authorization": `Bearer ${refresh_token}` } }
                ).then(res => {
                    if (res.status === 200) {
                        Cookies.set('access_token', res.data["access_token"]);
                        Cookies.set('refresh_token', res.data["refresh_token"]);
                        dispatch(changeAuthState(true));
                    }
                }).catch(err => {
                    setError(true);
                });
            } else {
                setError(true);
            }
        }
    }, [access_token, dispatch, error]);


    return (
        <div>
            {
                isAuthorized === false ?
                (
                    <ul className="login_reg_container">
                        <li className="navbar_item"><a href="/login">Login</a></li>
                        <li className="navbar_item"><a href="/registration">Sign up</a></li>
                    </ul>
                ) : (
                    <ul className="login_reg_container">
                        <li className="navbar_item"><a href="/basket">Basket</a></li>
                        <li className="navbar_item"><a href="/logout">Log out</a></li>
                    </ul>
                )
            }
        </div>
    )
}


export default AuthState;
