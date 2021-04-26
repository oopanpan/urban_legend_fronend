import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import { addPost, newUpdate } from '../actions/postActions';
import { setModal } from '../actions/modalActions';

function PostForm({ addPost, userId, postKeyword, setModal }) {
	const [keyword, setKeyword] = useState(postKeyword);

	const stylizedKeyword = (str) => {
		const output = str
			.toLowerCase()
			.split(' ')
			.filter((word) => word.length);
		return output.join('#');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const postObj = {
			post: {
				user_id: userId,
				header: e.target.header.value,
				content: e.target.content.value,
				keyword: stylizedKeyword(keyword),
			},
		};
		//! MODAL ACTIVATION && REDIRECTION
		const res = await addPost(postObj);
		if (res.id) {
			const buttons = [
				{ content: 'Check it out', path: `/posts/${res.id}` },
				{ content: 'All Post', path: '/discuss' },
				{ content: 'Close' },
			];
			setModal(true, 'Success', 'Your post is up now', buttons);
			e.target.reset();
		} else {
			const buttons = [{ content: 'Close' }];
			setModal(true, 'Something went wrong', res.message, buttons);
		}
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
				<h2>
					Please <a href='/login'>log in</a> or{' '}
					<a href='/signup'>sign up </a> to start.
				</h2>
			)}
		</div>
	);
}

const mapStateToProps = (state) => ({
	userId: state.auth.id,
	postKeyword: state.post.keyword,
});

export default connect(mapStateToProps, { newUpdate, addPost, setModal })(
	PostForm
);
