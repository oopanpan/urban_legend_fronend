import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import api from '../service/api';

import { newUpdate } from '../actions/postActions';

import './CommentForm.css';

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
						<Form.Label style={{ marginTop: '1rem' }}>
							New Comment
						</Form.Label>
						<Form.Control
							id='comment-textarea'
							as='textarea'
							name='content'
							rows={3}
						/>
						<Button
							id='comment-submit-btn'
							variant='outline-dark'
							size='sm'
							type='submit'
						>
							Submit
						</Button>
					</Form.Group>
				</Form>
			) : (
				<div style={{ textAlign: 'center', padding: '2rem' }}>
					Please <a href='/login'>Log in</a> or{' '}
					<a href='/signup'>Signup</a>
				</div>
			)}
		</>
	);
}

const mapStateToProps = (state) => {
	return { userId: state.auth.id };
};

export default connect(mapStateToProps, { newUpdate })(CommentForm);
