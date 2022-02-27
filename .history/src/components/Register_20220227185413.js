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
			<form className="register-form"
            aria-describedby='register-error-message'
            onSubmit={(event) => {
                event.preventDefault();
				setIsLoading(true);

                const phoneNumberFormatting = form
            }}
            />
		</div>
	);
}

export default Register;
