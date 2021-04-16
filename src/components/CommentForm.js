import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import api from '../service/api';

import { newUpdate } from '../actions/postActions';

function CommentForm({
	setComments,
	comments,
	setIsUpdate,
	newUpdate,
	userId,
	targetId,
	targetType,
}) {
	const handleSubmit = (e) => {
		e.preventDefault();
		const commentObj = {
			user_id: userId,
			commentable_type: targetType,
			commentable_id: targetId,
			content: e.target.content.value,
		};
		api.comment.postNewComment(commentObj).then((r) => {
			console.log(r);
			setComments && setComments([...comments, r]);
			setIsUpdate && setIsUpdate(true);
		});
		e.target.reset();
	};
	return (
		<>
			{userId ? (
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
			) : (
				<div>Log in or singup to start banging</div>
			)}
		</>
	);
}

const mapStateToProps = (state) => {
	return { userId: state.auth.id };
};

export default connect(mapStateToProps, { newUpdate })(CommentForm);
