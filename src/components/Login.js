import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import api from '../service/api';
import { Formik } from 'formik';
import * as yup from 'yup';

import { setAuth } from '../actions/userActions';
import { setModal } from '../actions/modalActions';

const initialValues = {
	email_address: '',
	password: '',
	password_confirmation: '',
};

const signupSchema = yup.object().shape({
	email_address: yup
		.string()
		.email('Please enter a valid email')
		.required('Email cannot be blank'),
	password: yup
		.string()
		.min(4, 'Password must be 4 characters or more')
		.max(16, 'Password must be 16 characters or less')
		.required('Password cannot be blank'),
});

function Login({ setAuth, setModal }) {
	const backendSubmit = async (data) => {
		const userObj = {
			user: {
				...data,
			},
		};
		const res = await api.user.postLogin(userObj);
		if (res.jwt) {
			localStorage.setItem('token', res.jwt);
			setAuth(res);
			const body = `Welcome Back to Urban Legend, ${res.user.username}. Where would you like to go?`;
			const buttons = [
				{ content: 'Explore', path: '/urban' },
				{ content: 'All Post', path: '/discuss' },
				{ content: 'Your Profile', path: `/profile/${res.user.id}` },
			];
			setModal(true, 'Congratulations!', body, buttons);
		} else {
			const buttons = [
				{ content: 'Close' },
				{ content: 'Signup', path: '/signup' },
			];
			setModal(true, 'Login Error', res.message, buttons);
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
					handleSubmit,
					errors,
					touched,
					handleChange,
					handleBlur,
					isValidating,
				} = formik;
				return (
					<Container style={{ marginTop: '3rem' }}>
						<Row
							className='justify-content-md-center'
							style={{ margin: '1rem' }}
						>
							<h1>User Login</h1>
						</Row>
						<Row className='justify-content-md-center'>
							<Col xs={12} md={5}>
								<Form onSubmit={handleSubmit}>
									<Form.Group controlID='userEmail'>
										<Form.Label>Email Address</Form.Label>
										<Form.Control
											type='email'
											placeholder='Enter email'
											name='email_address'
											value={values.email_address}
											onBlur={handleBlur}
											onChange={handleChange}
											// isValid={
											// 	touched.email_address &&
											// 	!errors.email_address
											// }
											isInvalid={
												touched.email_address &&
												!!errors.email_address
											}
										/>
										<Form.Control.Feedback type='invalid'>
											{errors.email_address}
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
											// isValid={
											// 	touched.password &&
											// 	!errors.password
											// }
											isInvalid={
												touched.password &&
												!!errors.password
											}
										/>
										<Form.Control.Feedback type='invalid'>
											{errors.password}
										</Form.Control.Feedback>
									</Form.Group>
									<Row className='justify-content-center'>
										<Button
											variant='outline-dark'
											type='submit'
											disabled={isValidating}
										>
											Login
										</Button>
									</Row>
								</Form>
							</Col>
						</Row>
					</Container>
				);
			}}
		</Formik>
	);
}

export default connect(null, { setAuth, setModal })(Login);
