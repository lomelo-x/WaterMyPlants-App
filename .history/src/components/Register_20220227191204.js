import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';
import registerSchema from '../Validation/registerSchema';
import InputMask from 'react-input-mask';
import { API_URL } from '../constants';

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
		setFormValue({
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
				<h1>REGISTER PAGE</h1>
			</div>
			<form
				className="register-form"
				aria-describedby="register-error-message"
				onSubmit={(event) => {
					event.preventDefault();
					setIsLoading(true);

					const formatNumber = formValues.phoneNumber.replace(/[^0-9]/g, '');
                    axios.post(`${API_URL}/auth/register`, {
                        ...formValues, phoneNumber: formatNumber
                    })
                    .then(() => {
                        setIsLoading(false)
                        setFormError('')
                        navigate('/login')
                    })
                    .catch(() => {
                        setFormError('server error, please try again')
                        setIsLoading(false)
                    })
				}}
			/>
            <div className="form-fields">
                <label htmlfor='username'>Username</label>
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
                <div className='error-message' role='alert' id='password-error-message'>
                    {fieldErrors.password}
                </div>
                <div className="form-fields">
                    <label htmlFor="phoneNumber">Phone Number</label>
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
                    <div className='error-message' role='alert' id='phoneNumber-error-message'>
                        {fieldErrors.phoneNumber}
                    </div>
                </div>
                <div className='error-message' role='alert' id='password-error-message'></div>
            </div>
		</div>
	);
}

export default Register;
