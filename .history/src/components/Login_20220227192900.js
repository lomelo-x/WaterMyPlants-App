import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import loginSchema from '../Validation/loginSchema';
import { API_URL } from '../Constants';
import { setUserId } from '../actions/profileActions';


const initFormValues = {
	username: '',
	password: '',
};

const initFormErrors = {
	username: '',
	password: '',
	loginAttempt: '',
};

const initDisabled = true;

function Login() {
	const navigate = useNavigate();

	const [formValues, setFormValues] = useState(initFormValues);
	const [formErrors, setFormErrors] = useState(initFormErrors);
	const [disabled, setDisabled] = useState(initDisabled);

	const validate = (username, value) => {
		yup
			.reach(loginSchema, username)
			.validate(value)
			.then(() => setFormErrors({ ...formErrors, [username]: '' }))
			.catch((error) =>
				setFormErrors({ ...formErrors, [username]: error.errors[0] })
			);
	};

	const onChange = (event) => {
		const { username, value } = event.target;
		validate(username, value);
		setFormValues({ ...formValues, [username]: value });
	};

	const onSubmit = (event) => {
		event.preventDefault();
		const loginAttempt = {
			username: formValues.username.trim(),
			password: formValues.password.trim(),
		};
		postLogin(loginAttempt);
	};

    const postLogin = (loginAttempt) => {
        axios.post(`${API_URL}/auth/login`, loginAttempt)
        .then((res) => {
            localStorage.setItem('token', res.data.token)
            dispatch(setUserId(res.data.user_id));
            navigate('/p')
        })
    }
    

	return (
		<div>
			<h1>LOGIN PAGE</h1>
		</div>
	);
}

export default Login;
