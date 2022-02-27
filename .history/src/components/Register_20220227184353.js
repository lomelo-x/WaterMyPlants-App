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
			.reach(signUpSchema, fieldName)
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
			signUpSchema.validateSync(formValues);
			return true;
		} catch (error) {
			return false;
		}
	};

    return (
        <div className='form-container'>
            <h3>Register</h3>
        </div>
    )
}

    return(
        <div>
            <h1>REGISTER PAGE</h1>
        </div>
    )
}

export default Register;
