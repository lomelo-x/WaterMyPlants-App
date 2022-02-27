import React, { useState, useEffect } from 'react';
import '../styles/Login.css';
import axios from 'axios';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import loginSchema from '../Validation/loginSchema';
import { API_URL } from '../Constants';
import { setUserId } from '../Actions/userActions';
import { connect } from 'react-redux';

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

function Login({ dispatch }) {
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
		axios
			.post(`${API_URL}/auth/login`, loginAttempt)
			.then((res) => {
				localStorage.setItem('token', res.data.token);
				dispatch(setUserId(res.data.user_id));
				navigate('/profile');
			})
			.catch((error) => {
				const loginError = {
					...formErrors,
					loginAttempt: 'Login failed. please try again.',
				};
				setFormErrors(loginError);
			})
			.finally(() => setFormValues(initFormValues));
	};

	useEffect(() => {
		loginSchema.isValid(formValues).then((valid) => setDisabled(!valid));
	}, [formValues]);

	return (
		<div className="login-container">
			<div>
				<h2>LOGIN PAGE</h2>
			</div>
			<form className="login-form" onSubmit={onSubmit}>
				<div className="form-fields">
					<label htmlFor="username">Username:</label>
					<input
						id="username"
						value={formValues.username}
						onChange={onChange}
						name="username"
						type="text"
						placeholder="username"
					/>
				</div>
				<form className="form-fields">
					<label htmlFor="password">Password:</label>
					<input
						id="password"
						value={formValues.password}
						onChange={onChange}
						name="password"
						type="password"
						placeholder="password"
					/>
				</form>
				<div className="button-container">
					<button type="submit" id="loginBtn" disabled={disabled}>
						LOGIN
					</button>
				</div>
				<div className="errors">
					<div>{formErrors.username}</div>
					<div>{formErrors.password}</div>
					<div>{formErrors.loginAttempt}</div>
				</div>
			</form>
		</div>
	);
}

const mapStateToProps = (state) => ({ user_id: state.user_id });
export default connect(mapStateToProps)(Login);
