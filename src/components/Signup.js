import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setAuth } from '../actions/userActions'
import { Form, Button, Container } from 'react-bootstrap';
import api from '../service/api'

const Signup = ({ auth, setAuth }) => {

    const handleSubmit = e =>{
        e.preventDefault()
        const userObj = {user:{
            email_address: e.target.email.value,
            password: e.target.password.value,
            password_confirmation: e.target.passwordConfirm.value,
            username: 'oopanpan',
            admin: e.target.email.value === 'oopanpan@gmail.com'
        }}
        api.user.postSignup(userObj).then(r => {
            console.log(r)
            localStorage.setItem('token', r.jwt)
            setAuth(r)
        })
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name='email'/>
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name='password'/>
                </Form.Group>
                <Form.Group controlId='formBasicPasswordConfirm' hasValidation>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" name='passwordConfirm' required isInvalid/>
                </Form.Group>
                <Button variant="dark" type="submit">
                    Signup
                </Button>
            </Form>
        </Container>
    )
}

export default connect(null, { setAuth })(Signup);
