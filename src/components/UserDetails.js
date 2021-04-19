import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Col, Row, Table, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function UserDetails({ thisUser }) {
	const [onView, setOnView] = useState('post');

	const handleClick = (e) => {
		e.stopPropagation();
		setOnView(e.target.innerText.toLowerCase());
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
							<td>
								<img
									src={'http://localhost:3000/' + user.avatar}
									width='20'
									height='20'
								/>
							</td>
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
							<td>
								<img
									src={'http://localhost:3000/' + user.avatar}
									width='20'
									height='20'
								/>
							</td>
							<td>{user.username}</td>
						</tr>
					);
				});
		}
	};
	return (
		<div className='d-flex justify-content-center'>
			<Table style={{ borderCollapse: 'collapse', width: '80%' }}>
				<thead>
					<tr>
						<th>{thisUser.posts.length}</th>
						<th>{thisUser.following.length}</th>
						<th>{thisUser.follower.length}</th>
					</tr>
					<tr>
						<th key='post' onClick={handleClick}>
							Post
						</th>
						<th key='following' onClick={handleClick}>
							Following
						</th>
						<th key='follower' onClick={handleClick}>
							Follower
						</th>
					</tr>
				</thead>
				<tbody>{renderTable(thisUser)}</tbody>
			</Table>
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
