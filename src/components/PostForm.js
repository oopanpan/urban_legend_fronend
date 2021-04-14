import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import api from '../service/api';

function PostForm({ userID }) {
	const handleSubmit = (e) => {
		e.preventDefault();
		const postObj = {
			post: {
				user_id: userID,
				header: e.target.header.value,
				content: e.target.content.value,
			},
		};
		api.post.postNewPost(postObj).then(console.log);
	};

	return (
		<div>
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId='postHeader'>
					<Form.Label>Title</Form.Label>
					<Form.Control require as='input' name='header' rows={3} />
				</Form.Group>
				<Form.Group controlId='postContent'>
					<Form.Label>New Post</Form.Label>
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

const mapStateToProps = (state) => ({
	userID: state.auth.id,
	postKeyword: state.post.keyword,
});

export default connect(mapStateToProps, {})(PostForm);
