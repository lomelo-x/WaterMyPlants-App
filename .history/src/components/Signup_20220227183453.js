import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';
import signUpSchema from '../validation/signUpSchema';
import InputMask from 'react-input-mask';
import { BASE_URL } from '../constants';

const initFormValues = {
	username: '',
	password: '',
	phoneNumber: '',
};

function SignUp() {
	const [formValues, setFormValues] = useState(initFormValues);
	const [fieldErrors, setFieldErrors] = useState({});
	const [formError, setFormError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()

    const onChange = (event) => {
        setFormValue({...formValues, [event.target.username]: event})
    }
}
