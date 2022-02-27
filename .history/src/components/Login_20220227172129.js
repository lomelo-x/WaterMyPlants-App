import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup';

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
    const navigate = useNav
	return (
		<div>
			<h1>LOGIN PAGE</h1>
		</div>
	);
}

export default Login;
