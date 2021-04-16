import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import { addPost, newUpdate } from '../actions/postActions';

import api from '../service/api';

function PostForm({ addPost, userId }) {
	const handleSubmit = (e) => {
		e.preventDefault();
		const postObj = {
			post: {
				user_id: userId,
				header: e.target.header.value,
				content: e.target.content.value,
			},
		};
		addPost(postObj);
	};

	return (
		<div>
			{userId ? (
				<Form onSubmit={handleSubmit}>
					<Form.Group controlId='postHeader'>
						<Form.Label>Title</Form.Label>
						<Form.Control
							require
							as='input'
							name='header'
							rows={3}
						/>
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
			) : (
				<h2>Please login or sign up to post.</h2>
			)}
		</div>
	);
}

const mapStateToProps = (state) => ({
	userId: state.auth.id,
	postKeyword: state.post.keyword,
});

export default connect(mapStateToProps, { newUpdate, addPost })(PostForm);
