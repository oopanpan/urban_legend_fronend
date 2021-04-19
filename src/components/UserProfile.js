import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { DirectUpload } from 'activestorage';

import { getProfile } from '../actions/profileActions';
import { newFollow, unFollow } from '../actions/followActions';

function UserProfile({
	routerProps,
	currentUser,
	thisUser,
	getProfile,
	newFollow,
	unFollow,
}) {
	console.log(routerProps);
	console.log(routerProps.match.params.id);
	const [selectedFile, setSelectedFile] = useState(null);

	useEffect(() => {
		getProfile(routerProps.match.params.id);
	}, []);

	const handleFollow = () => {
		const isFollowed = thisUser.follower.find(
			(friend) => friend.follower_id === currentUser.id
		);
		console.log(isFollowed);
		if (isFollowed) {
			unFollow(isFollowed.id, thisUser.follower);
		} else {
			const followObj = {
				user_id: currentUser.id,
				friend_id: thisUser.id,
			};
			const newFollowerObj = {
				follower_id: currentUser.id,
				username: currentUser.username,
				avatar: currentUser.avatar,
			};
			newFollow(followObj, thisUser.follower, newFollowerObj);
		}
	};
	return (
		<div>
			<Container>
				<img
					alt='user-avatar'
					src={'http://localhost:3000/' + thisUser.avatar}
					width='200'
					height='200'
				/>
				<h1>{thisUser.username}</h1>
				<button onClick={handleFollow}>Follow</button>
				<h2>{thisUser.emailAddress}</h2>
				<h2>{thisUser.bio}</h2>
				<h2>{thisUser.keyword}</h2>
				<form></form>
			</Container>
		</div>
	);
}

const mapStateToProps = (state) => {
	const {
		id,
		username,
		email_address,
		bio,
		keyword,
		posts,
		avatar,
		friendships,
		inverse_friendships,
	} = state.profile;
	return {
		currentUser: {
			id: state.auth.id,
			username: state.auth.username,
			avatar: state.auth.avatar,
			friends: state.auth.friends,
		},
		thisUser: {
			id,
			username,
			emailAddress: email_address,
			bio,
			keyword,
			posts,
			avatar,
			following: friendships,
			follower: inverse_friendships,
		},
	};
};

export default connect(mapStateToProps, { getProfile, newFollow, unFollow })(
	UserProfile
);
