import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form, Card, Button, Row, Col } from 'react-bootstrap';
import { Icon } from 'semantic-ui-react';

import { newUpdate, updatePost, deletePost } from '../actions/postActions';
import api from '../service/api';
import './EditingForm.css';

function EditingForm({
	comments,
	setComments,
	commentId,
	setIsUpdate,
	handleEdit,
	data,
	updatePost,
	deletePost,
	setUpdated,
}) {
	const [formHeader, setFormHeader] = useState(data.header);
	const [formContent, setFormContent] = useState(data.content);

	const handleChange = (e) => {
		e.target.name === 'header' && setFormHeader(e.target.value);
		e.target.name === 'content' && setFormContent(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (data.header) {
			const postObj = {
				id: data.id,
				header: formHeader,
				content: formContent,
			};
			api.post.patchPost(postObj).then((r) => {
				setUpdated ? setUpdated(true) : updatePost(r);
			}, handleEdit());
			//! MODAL ACTIVATION && REDIRECTION
		} else {
			const commentObj = {
				id: data.id,
				content: formContent,
			};
			api.comment
				.patchComment(commentObj)
				.then(setIsUpdate(true), handleEdit());
			//! MODAL ACTIVATION && REDIRECTION
		}
	};

	const handleDelete = () => {
		if (data.header) {
			deletePost(data.id);
		} else {
			api.comment
				.deleteComment(data.id)
				.then(
					setComments(
						comments.filter((comment) => comment.id !== commentId)
					)
				);
		}
	};
	return (
		<Form onSubmit={handleSubmit}>
			<Card.Body>
				{data.header && (
					<Form.Control
						as='input'
						name='header'
						onChange={handleChange}
						value={formHeader}
					/>
				)}
				<Form.Control
					as='textarea'
					name='content'
					onChange={handleChange}
					value={formContent}
					row={5}
				/>
			</Card.Body>
			<Card.Footer>
				<Row
					style={{
						paddingRight: '1rem',
					}}
				>
					<Col></Col>
					<Icon
						title='Cancel'
						name='backward'
						size='large'
						onClick={handleEdit}
					/>

					<button id='edit-submit-btn' type='submit'>
						<Icon
							title='Save'
							name='save outline'
							size='large'
							type='submit'
						/>
					</button>
					<Icon
						className='icon'
						title='Delete'
						name='trash alternate outline'
						size='large'
						onClick={handleDelete}
					/>
				</Row>
			</Card.Footer>
		</Form>
	);
}

const mapStateToProps = (state) => {
	return {
		userId: state.auth.id,
	};
};

export default connect(mapStateToProps, { updatePost, deletePost })(
	EditingForm
);
