import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import { addPost, newUpdate } from '../actions/postActions';

import api from '../service/api';

function PostForm({ addPost, userId, postKeyword }) {
	const [keyword, setKeyword] = useState(postKeyword);
	const handleSubmit = (e) => {
		e.preventDefault();
		const postObj = {
			post: {
				user_id: userId,
				header: e.target.header.value,
				content: e.target.content.value,
				keyword: keyword.toLowerCase(),
			},
		};
		//! MODAL ACTIVATION && REDIRECTION
		addPost(postObj);
	};

	return (
		<div
			className='container justify-content-center'
			style={{ marginTop: '2rem' }}
		>
			{userId ? (
				<>
					<Row className='justify-content-center'>
						<h2>New Post</h2>
					</Row>
					<Row className='justify-content-center'>
						<Col xs={12} md={6}>
							<Form onSubmit={handleSubmit}>
								<Form.Group controlId='postHeader'>
									<Form.Label>Header</Form.Label>
									<Form.Control as='input' name='header' />
								</Form.Group>
								<Form.Group controlId='postContent'>
									<Form.Label>Body</Form.Label>
									<Form.Control
										as='textarea'
										name='content'
										rows={8}
									/>
								</Form.Group>
								<Form.Group controlId='postKeyword'>
									<Form.Label>Tags</Form.Label>
									<Form.Control
										as='input'
										name='keyword'
										value={keyword}
										onChange={(e) =>
											setKeyword(e.target.value)
										}
									/>
								</Form.Group>
								<div>
									<Button variant='dark' type='submit'>
										Submit
									</Button>
								</div>
							</Form>
						</Col>
					</Row>
				</>
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
