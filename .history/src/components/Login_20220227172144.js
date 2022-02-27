import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate()

    const
	return (
		<div>
			<h1>LOGIN PAGE</h1>
		</div>
	);
}

export default Login;
