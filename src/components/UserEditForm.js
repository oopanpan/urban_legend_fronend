import React, { useState } from 'react';
import { connect } from 'react-redux';

import { patchProfile } from '../actions/profileActions';

function UserEditForm({ thisUser, patchProfile }) {
	const [username, setUsername] = useState(thisUser.username);
	const [bio, setBio] = useState(thisUser.bio);
	const [keyword, setKeyword] = useState(thisUser.keyword);
	const [newImg, setNewImg] = useState(null);

	const handleChange = (e) => {
		console.log(e.target.name);
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

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(e.target);
		const formData = new FormData();
		formData.append('username', username);
		formData.append('bio', bio);
		formData.append('keyword', keyword);
		newImg && formData.append('avatar', newImg);
		patchProfile(thisUser.id, formData);
	};
	return (
		<div>
			<form onSubmit={handleSubmit}>
				hi I'm a form
				<input
					name='username'
					onChange={handleChange}
					value={username}
				/>
				<input name='bio' onChange={handleChange} value={bio} />
				<input name='keyword' onChange={handleChange} value={keyword} />
				<input type='file' name='avatar' onChange={handleChange} />
				<input type='submit' />
			</form>
		</div>
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

export default connect(mapStateToProps, { patchProfile })(UserEditForm);
