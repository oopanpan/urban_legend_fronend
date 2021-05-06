import React from 'react';
import { connect } from 'react-redux';
import { Form, Button, Container, Col, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';

import { setModal } from '../actions/modalActions';
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

const Signup = ({ setModal, setAuth }) => {
	const backendSubmit = async (data) => {
		const userObj = {
			user: { ...data },
		};
		const res = await api.user.postSignup(userObj);
		// console.log(r);
		console.log(res);
		if (res.jwt) {
			localStorage.setItem('token', res.jwt);
			setAuth(res);
			const body = `Welcome to Urban Legend, ${res.user.username}. Where would you like to go?`;
			const buttons = [
				{ content: 'Explore', path: '/urban' },
				{ content: 'All Post', path: '/discuss' },
				{ content: 'Your Profile', path: `/profile/${res.user.id}` },
			];
			setModal(true, 'Congratulations!', body, buttons);
		} else {
			const buttons = [{ content: 'Close' }];
			setModal(true, 'Sign Up Error', res.message, buttons);
		}
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
					<Container style={{ marginTop: '2rem' }}>
						<Row className='justify-content-center'>
							<Col xs={12} md={6}>
								<h1>Signup </h1>
								<Form
									noValidate
									onSubmit={handleSubmit}
									style={{ paddingBottom: '3rem' }}
								>
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
											We'll never share your email with
											anyone else.
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
												touched.username &&
												!errors.username
											}
											isInvalid={
												touched.username &&
												!!errors.username
											}
										/>
										<Form.Control.Feedback type='invalid'>
											{errors.username}
										</Form.Control.Feedback>
										<Form.Text className='text-muted'>
											You can change it later
										</Form.Text>
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
												touched.password &&
												!errors.password
											}
											isInvalid={
												touched.password &&
												!!errors.password
											}
										/>
										<Form.Control.Feedback type='invalid'>
											{errors.password}
										</Form.Control.Feedback>
									</Form.Group>

									<Form.Group controlId='formBasicPasswordConfirm'>
										<Form.Label>
											Confirm Password
										</Form.Label>
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
											isInvalid={
												!!errors.password_confirmation
											}
										/>
										<Form.Control.Feedback type='invalid'>
											{errors.password_confirmation}
										</Form.Control.Feedback>
									</Form.Group>

									<div
										style={{
											minWidth: '100%',
										}}
									>
										<Button
											disabled={isValidating}
											variant='outline-dark'
											type='submit'
											style={{
												right: '1rem',
												bottom: '0',
												position: 'absolute',
											}}
										>
											Signup
										</Button>
									</div>
								</Form>
							</Col>
						</Row>
					</Container>
				);
			}}
		</Formik>
	);
};

export default connect(null, { setAuth, setModal })(Signup);
