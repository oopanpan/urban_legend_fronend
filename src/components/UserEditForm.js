import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Form, Button } from 'react-bootstrap';

import { patchProfile } from '../actions/profileActions';
import { setModal } from '../actions/modalActions';

import api from '../service/api';

function UserEditForm({ thisUser, patchProfile, setEditing, setModal }) {
	const [username, setUsername] = useState(thisUser.username);
	const [bio, setBio] = useState(thisUser.bio);
	const [keyword, setKeyword] = useState(thisUser.keyword);
	const [newImg, setNewImg] = useState(null);

	const handleChange = (e) => {
		if (e.target.files) {
			setNewImg(e.target.files[0]);
		} else {
			switch (e.target.name) {
				case 'username':
					setUsername(e.target.value);
					break;
				case 'bio':
					setBio(e.target.value);
					break;
				case 'keyword':
					setKeyword(e.target.value);
					break;
			}
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('username', username);
		formData.append('bio', bio);
		formData.append('keyword', keyword);
		newImg && formData.append('avatar', newImg);
		const res = await patchProfile(thisUser.id, formData);
		console.log(res);
		if (res.user) {
			setEditing();
		} else {
			const buttons = [{ content: 'Close' }];
			setModal(true, 'Editing Errors', res.message, buttons);
		}
	};
	return (
		<>
			<Form onSubmit={handleSubmit}>
				<Row>
					<Col>
						<div>
							<img
								id='user-avatar'
								alt='user-avatar'
								src={thisUser.avatar}
								width='120px'
								height='120px'
							/>
						</div>
						<input
							id='file-btn'
							type='file'
							name='avatar'
							onChange={handleChange}
						/>
					</Col>
					<Col>
						<Form.Label>Username</Form.Label>
						<Form.Control
							name='username'
							onChange={handleChange}
							value={username}
						/>
						<Form.Label>Tags</Form.Label>
						<Form.Control
							name='keyword'
							onChange={handleChange}
							value={keyword}
						/>
						<Form.Label>Bio</Form.Label>
						<Form.Control
							as='textarea'
							name='bio'
							onChange={handleChange}
							value={bio}
						/>
					</Col>
				</Row>
				<div id='editing-btn-group'>
					<Button
						size='sm'
						variant='outline-dark'
						onClick={() => setEditing()}
					>
						Cancel
					</Button>
					<Button size='sm' variant='outline-dark' type='submit'>
						Submit
					</Button>
				</div>
			</Form>
		</>
	);
}

const mapStateToProps = (state) => {
	const { id, username, email_address, bio, keyword, avatar } = state.profile;
	return {
		thisUser: {
			id,
			username,
			email_address,
			bio,
			keyword,
			avatar,
		},
	};
};

export default connect(mapStateToProps, { patchProfile, setModal })(
	UserEditForm
);
