import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import api from "../service/api";

import { setAuth } from "../actions/userActions";

function Login({ setAuth }) {
	const handleSubmit = (e) => {
		e.preventDefault();
		console.dir(e.target);
		const userObj = {
			user: {
				email_address: e.target.email.value,
				password: e.target.password.value,
			},
		};
		api.user.postLogin(userObj).then((r) => {
			console.log(r);
			localStorage.setItem("token", r.jwt);
			setAuth(r);
		});
	};

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
								name='email'
							/>
						</Form.Group>
						<Form.Group controlId='formBasicPassword'>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type='password'
								placeholder='Password'
								name='password'
							/>
						</Form.Group>
						<Row className='justify-content-center align-items-center'>
							<Button
								variant='dark'
								size='lg'
								block
								style={{ borderRadius: "8px" }}
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
}

export default connect(null, { setAuth })(Login);
