import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { DirectUpload } from 'activestorage';

import { getProfile } from '../actions/profileActions';
import { newFollow, unFollow } from '../actions/followActions';

import UserHeader from './UserHeader';
import PostRender from './PostRender';
import UserDetails from './UserDetails';
import UserEditForm from './UserEditForm';

function UserProfile({
	routerProps,
	currentUser,
	thisUser,
	getProfile,
	newFollow,
	unFollow,
}) {
	const [selectedFile, setSelectedFile] = useState(null);
	const [isFollowed, setIsFollowed] = useState(false);
	const [onView, setOnView] = useState('posts');

	useEffect(async () => {
		const following = await getProfile(
			routerProps.match.params.id
		).then((r) =>
			r.inverse_friendships.find(
				(friend) => friend.follower_id === currentUser.id
			)
		);
		console.log(following);
		following && setIsFollowed(true);
	}, [isFollowed, routerProps]);

	const handleFollow = async () => {
		const friendship = thisUser.follower.find(
			(follower) => follower.follower_id === currentUser.id
		);
		if (friendship) {
			await unFollow(friendship.id, thisUser.follower);
			setIsFollowed(false);
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
			await newFollow(followObj, thisUser.follower, newFollowerObj);
			setIsFollowed(true);
		}
	};

	const postRender = () => {
		return thisUser.posts.map((post) => (
			<PostRender userId={thisUser.id} data={post} />
		));
	};
	return (
		<div>
			{thisUser.id ? (
				<Container style={{ margin: '3rem' }}>
					<UserHeader
						thisUser={thisUser}
						isFollowed={isFollowed}
						handleFollow={handleFollow}
					/>
					<UserEditForm />
					<UserDetails thisUser={thisUser} />
				</Container>
			) : null}
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
		avatar,
		posts,
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
