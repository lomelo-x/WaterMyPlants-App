import * as yup from 'yup';

const signUpSchema = yup.object().shape({
	username: yup.string().required().min(5),
	password: yup.string().required().min(5),
	phoneNumber: yup
		.string()
		.test('has-10-digits', 'phone number needs to have 10 digits', (value) => {
			const digitsOnlyString = value.replace(/[^0-9]/g, '');
			return digitsOnlyString.length === 10;
		})
		.required(),
});

export default signUpSchema;