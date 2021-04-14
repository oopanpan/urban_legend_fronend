import React from 'react';
import { Form, Button } from 'react-bootstrap';

function CommentForm() {
	const handleSubmit = (e) => {
		e.preventDefault();
		console.dir(e.target);
	};
	return (
		<div>
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId='postContent'>
					<Form.Label>New Comment</Form.Label>
					<Form.Control
						require
						as='textarea'
						name='content'
						rows={3}
					/>
				</Form.Group>
				<Form.Group controlId='postKeyword'></Form.Group>
				<div>
					<Button variant='dark' type='submit'>
						Submit
					</Button>
				</div>
			</Form>
		</div>
	);
}

export default CommentForm;
