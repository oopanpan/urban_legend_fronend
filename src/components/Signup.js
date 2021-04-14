import React from 'react';
import { connect } from 'react-redux';
import { Form, Button, Container } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';

import { setAuth } from '../actions/userActions';
import api from '../service/api';

const initialValues = {
	email_address: '',
	username: '',
	password: '',
	password_confirmation: '',
};

const signupSchema = yup.object().shape({
	email_address: yup
		.string()
		.email('Please enter a valid email')
		.required('Email cannot be blank'),
	username: yup.string().required('Username cannot be blank'),
	password: yup
		.string()
		.min(4, 'Password must be 4 characters or more')
		.max(16, 'Password must be 16 characters or less')
		.required('Password cannot be blank'),
	password_confirmation: yup
		.string()
		.required('')
		.oneOf([yup.ref('password'), null], 'Did not match password'),
});

const Signup = ({ auth, setAuth }) => {
	const backendSubmit = (data) => {
		const userObj = {
			user: { ...data },
		};
		api.user.postSignup(userObj).then((r) => {
			console.log(r);
			localStorage.setItem('token', r.jwt);
			setAuth(r);
		});
	};
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={signupSchema}
			onSubmit={(data) => backendSubmit(data)}
		>
			{(formik) => {
				const {
					values,
					handleChange,
					handleSubmit,
					errors,
					touched,
					handleBlur,
					isValidating,
					isValid,
					dirty,
				} = formik;
				return (
					<Container>
						<h1>Signup Form</h1>
						<Form noValidate onSubmit={handleSubmit}>
							<Form.Group controlId='formBasicEmail'>
								<Form.Label>Email address</Form.Label>
								<Form.Control
									placeholder='Enter email'
									name='email_address'
									value={values.email_address}
									onBlur={handleBlur}
									onChange={handleChange}
									isValid={
										touched.email_address &&
										!errors.email_address
									}
									isInvalid={
										touched.email_address &&
										!!errors.email_address
									}
								/>
								<Form.Control.Feedback type='invalid'>
									{errors.email_address}
								</Form.Control.Feedback>
								<Form.Text className='text-muted'>
									We'll never share your email with anyone
									else.
								</Form.Text>
							</Form.Group>

							<Form.Group controlId='formUsername'>
								<Form.Label>Username</Form.Label>
								<Form.Control
									placeholder='Your display name'
									type='text'
									name='username'
									value={values.username}
									onBlur={handleBlur}
									onChange={handleChange}
									isValid={
										touched.username && !errors.username
									}
									isInvalid={
										touched.username && !!errors.username
									}
								/>
								<Form.Control.Feedback type='invalid'>
									{errors.username}
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group controlId='formBasicPassword'>
								<Form.Label>Password</Form.Label>
								<Form.Control
									type='password'
									placeholder='Password'
									name='password'
									value={values.password}
									onBlur={handleBlur}
									onChange={handleChange}
									isValid={
										touched.password && !errors.password
									}
									isInvalid={
										touched.password && !!errors.password
									}
								/>
								<Form.Control.Feedback type='invalid'>
									{errors.password}
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group controlId='formBasicPasswordConfirm'>
								<Form.Label>Confirm Password</Form.Label>
								<Form.Control
									type='password'
									placeholder='Confirm Password'
									name='password_confirmation'
									onChange={handleChange}
									value={values.password_confirmation}
									isValid={
										!!values.password_confirmation &&
										!errors.password_confirmation
									}
									isInvalid={!!errors.password_confirmation}
								/>
								<Form.Control.Feedback type='invalid'>
									{errors.password_confirmation}
								</Form.Control.Feedback>
							</Form.Group>

							<div>
								<Button
									disabled={isValidating}
									variant='dark'
									type='submit'
								>
									Signup
								</Button>
							</div>
						</Form>
					</Container>
				);
			}}
		</Formik>
	);
};

export default connect(null, { setAuth })(Signup);
