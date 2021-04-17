import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';

function UserProfile({ username, emailAddress, bio, keyword }) {
	const [selectedFile, setSelectedFile] = useState(null);
	return (
		<div>
			<Container>
				<h1>{username}</h1>
				<h2>{emailAddress}</h2>
				<h2>{bio}</h2>
				<h2>{keyword}</h2>
				<form></form>
			</Container>
		</div>
	);
}

const mapStateToProps = (state) => {
	const { username, email_address, bio, keyword, posts } = state.auth;
	return {
		username,
		emailAddress: email_address,
		bio,
		keyword,
		posts,
	};
};

export default connect(mapStateToProps)(UserProfile);
