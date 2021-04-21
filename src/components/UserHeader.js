import React from 'react';
import { connect } from 'react-redux';
import { Card, Col, Container, Row } from 'react-bootstrap';

function UserHeader({ thisUser, handleFollow, isFollowed, currentUser }) {
	const authUser = currentUser.id === thisUser.id;

	const handleEdit = () => {};
	return (
		<div className='d-flex justify-content-center'>
			<Card
				className='container'
				style={{ width: '80%', alignSelf: 'center' }}
			>
				<Card.Body className='container'>
					<Row>
						<Col>
							<div>
								<img
									alt='user-avatar'
									src={
										'http://localhost:3000/' +
										thisUser.avatar
									}
									width='150px'
									height='150px'
								/>
							</div>
						</Col>
						<Col
							className='justify-content-center'
							style={{ marginLeft: '2rem' }}
						>
							<h1>{thisUser.username}</h1>
							{authUser ? (
								<button onClick={handleEdit}>Edit</button>
							) : (
								<button onClick={handleFollow}>
									{isFollowed ? 'Unfollow' : 'Follow'}
								</button>
							)}
							<h2>{thisUser.emailAddress}</h2>
							<h2>{thisUser.bio}</h2>
							<h2>{thisUser.keyword}</h2>
						</Col>
					</Row>
				</Card.Body>
			</Card>
		</div>
	);
}

const mapStateToProps = (state) => {
	return { currentUser: state.auth };
};

export default connect(mapStateToProps)(UserHeader);
