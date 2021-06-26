import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Col, Row, Table, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import api from '../service/api';

function UserDetails({ thisUser }) {
	const [onView, setOnView] = useState('post');

	const handleClick = (e) => {
		e.stopPropagation();
		console.log(e.target);
		setOnView(e.target.innerText.toLowerCase());
	};

	const renderAvatar = (user) => {
		return (
			<img
				src={api.AVATAR + user.avatar}
				alt='avatar'
				width='20'
				height='20'
			/>
		);
	};

	const renderTable = (user) => {
		switch (onView) {
			case 'post':
				return user.posts.map((post) => {
					return (
						<tr>
							<td colSpan='3'>
								<Card
									as={Link}
									to={`/posts/${post.id}`}
									style={{
										height: '3rem',
										alignSelf: 'center',
										marginTop: '0.2rem',
										marginBottom: '0.2rem',
										textAlign: 'center',
									}}
								>
									<p
										style={{
											paddingTop: '0.5rem',
											paddingBottom: '0.5rem',
										}}
									>
										{post.header}
									</p>
								</Card>
							</td>
						</tr>
					);
				});
			case 'following':
				return user.following.map((user) => {
					return (
						<tr>
							<td>{renderAvatar(user)}</td>
							<td>
								<Link to={`/profile/${user.following_id}`}>
									{user.username}
								</Link>
							</td>
						</tr>
					);
				});
			case 'follower':
				return user.follower.map((user) => {
					return (
						<tr>
							<td>{renderAvatar(user)}</td>
							<td>
								<Link to={`/profile/${user.follower_id}`}>
									{user.username}
								</Link>
							</td>
						</tr>
					);
				});
			default:
				return <></>;
		}
	};
	return (
		<div className='container justify-content-center' id='detail-container'>
			<Row id='first-detail-row'>
				<Col xs={12} md={4} key='post' onClick={handleClick}>
					<p>{thisUser.posts.length}</p>
					<p>Post</p>
				</Col>
				<Col xs={12} md={4} key='following' onClick={handleClick}>
					<p>{thisUser.following.length}</p>
					<p>Following</p>
				</Col>
				<Col xs={12} md={4} key='follower' onClick={handleClick}>
					<p>{thisUser.follower.length}</p>
					<p>Follower</p>
				</Col>
			</Row>
			<Row className='justify-content-center'>
				<Table
					id='user-detail-table'
					style={{ borderCollapse: 'collapse', width: '80%' }}
				>
					<tbody>{renderTable(thisUser)}</tbody>
				</Table>
			</Row>
		</div>
	);
}

// const mapStateToProps = (state) => {
// 	return {
// 		thisUser: state.profile,
// 	};
// };

export default UserDetails;
// export default connect()(UserDetails);
