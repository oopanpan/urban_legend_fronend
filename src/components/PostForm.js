import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

function PostForm() {
	return (
		<div>
			<Form>
				<Form.Group controlId='exampleForm.ControlTextarea1'>
					<Form.Label>New Post</Form.Label>
					<Form.Control as='textarea' rows={3} />
					<Button>Submit</Button>
				</Form.Group>
			</Form>
		</div>
	);
}

export default connect(null, {})(PostForm);
