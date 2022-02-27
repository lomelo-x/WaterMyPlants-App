import React, { useState } from 'react';
import '../styles/Register.css';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';
import registerSchema from '../Validation/registerSchema';
import InputMask from 'react-input-mask';
import { API_URL } from '../Constants';

const initFormValues = {
	username: '',
	password: '',
	phoneNumber: '',
};

function Register() {
	const [formValues, setFormValues] = useState(initFormValues);
	const [fieldErrors, setFieldErrors] = useState({});
	const [formError, setFormError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();

	const onChange = (event) => {
		setFormValues({
			...formValues,
			[event.target.username]: event.target.value,
		});
	};

	const validateField = (fieldName, fieldValue) => {
		yup
			.reach(registerSchema, fieldName)
			.validate(fieldName)
			.then(() => {
				setFieldErrors({ ...fieldErrors, [fieldName]: '' });
			})
			.catch((error) => {
				setFieldErrors({ ...fieldErrors, [fieldName]: error.message });
			});
	};

	const isValidForm = () => {
		try {
			registerSchema.validateSync(formValues);
			return true;
		} catch (error) {
			return false;
		}
	};

	return (
		<div className="register-container">
			<div>
				<h2>REGISTER</h2>
			</div>
			<form
				className="register-form"
				aria-describedby="register-error-message"
				onSubmit={(event) => {
					event.preventDefault();
					setIsLoading(true);

					const formatNumber = formValues.phoneNumber.replace(/[^0-9]/g, '');
					axios
						.post(`${API_URL}/auth/register`, {
							...formValues,
							phoneNumber: formatNumber,
						})
						.then(() => {
							setIsLoading(false);
							setFormError('');
							navigate('/login');
						})
						.catch(() => {
							setFormError('server error, please try again');
							setIsLoading(false);
						});
				}}
			/>
			<div className="form-fields">
				<label htmlFor="username">Username:</label>
				<input
					aria-describedby="username-error-message"
					aria-invalid={fieldErrors.username ? true : false}
					id="username"
					name="username"
					value={formValues.username}
					onChange={onChange}
					onBlur={(event) => {
						validateField(event.target.name, event.target.value);
					}}
				/>
				<div className="error-message" role="alert" id="username-error-message">
					{fieldErrors.username}
				</div>
			</div>

			<div className="form-fields">
				<label htmlFor="password">Password:</label>
				<input
					aria-describedby="password-error-message"
					aria-invalid={fieldErrors.password ? true : false}
					id="password"
					name="password"
					type="password"
					value={formValues.password}
					onChange={onChange}
					onBlur={(event) => {
						validateField(event.target.name, event.target.value);
					}}
				/>
				<div className="error-message" role="alert" id="password-error-message">
					{fieldErrors.password}
				</div>
			</div>

			<div className="form-fields">
				<label htmlFor="phoneNumber">Phone Number:</label>
				<InputMask
					aria-describedby="phone-error-message"
					aria-invalid={fieldErrors.phoneNumber ? true : false}
					id="phoneNumber"
					name="phone number"
					mask="(999) 999-9999"
					type="tel"
					value={formValues.phoneNumber}
					onChange={onChange}
					onBlur={(event) => {
						validateField(event.target.username, event.target.value);
					}}
				/>
				<div
					className="error-message"
					role="alert"
					id="phoneNumber-error-message"
				>
					{fieldErrors.phoneNumber}
				</div>
			</div>
			<div className="error-message" role="alert" id="form-error-message">
				{formError}
			</div>
            <div className='button-container'>
            <button className='submit-button' type="submit" disabled={!isValidForm() || isLoading}>
				{isLoading ? 'loading...' : 'SUBMIT'}
			</button>
            </div>
			
		</div>
	);
}

export default Register;
