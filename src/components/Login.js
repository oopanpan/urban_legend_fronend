import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import api from '../service/api';
import { Formik } from 'formik';
import * as yup from 'yup';

import { setAuth } from '../actions/userActions';

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

function Login({ routerProps, setAuth }) {
	const backendSubmit = (data) => {
		const userObj = {
			user: {
				...data,
			},
		};
		api.user.postLogin(userObj).then((r) => {
			localStorage.setItem('token', r.jwt);
			setAuth(r);
			routerProps.history.push('/discuss');
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const userObj = {
			user: {
				email_address: e.target.email.value,
				password: e.target.password.value,
			},
		};
		api.user.postLogin(userObj).then((r) => {
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
					handleSubmit,
					errors,
					touched,
					handleChange,
					handleBlur,
					isValid,
					dirty,
				} = formik;
				return (
					<Container>
						<Row className='justify-content-md-center'>
							<Col xs lg='auto'>
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
									<Row className='justify-content-center align-items-center'>
										<Button
											variant='dark'
											size='lg'
											block
											style={{ borderRadius: '8px' }}
											className='col-5 col-sm-4 col-lg-2 mt-4 mb-3'
											type='submit'
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

export default connect(null, { setAuth })(Login);
