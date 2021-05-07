import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import UserEditForm from './UserEditForm';
import { setCityKeyword } from '../actions/postActions';
import './UserProfile.css';

import api from '../service/api';

function UserHeader({
	thisUser,
	handleFollow,
	isFollowed,
	currentUser,
	setCityKeyword,
}) {
	const authUser = currentUser.id === thisUser.id;
	const [editing, setEditing] = useState(false);

	const handleEdit = () => {
		setEditing(!editing);
	};

	const turnKeywordsToLinks = () => {
		const parseArr = thisUser.keyword.split(' ');
		return parseArr.map((ele) => (
			<Link to='/discuss' key={ele} onClick={() => setCityKeyword(ele)}>
				{`#${ele}`}
			</Link>
		));
	};
	return (
		<div className='d-flex justify-content-center'>
			<Card
				className='container'
				style={{ width: '80%', alignSelf: 'center' }}
			>
				<Card.Body className='container'>
					{editing ? (
						<UserEditForm setEditing={setEditing} />
					) : (
						<Row>
							<Col className='justify-content-center'>
								<div>
									<img
										id='user-avatar'
										alt='user-avatar'
										src={api.AVATAR + thisUser.avatar}
										width='120px'
										height='120px'
									/>
								</div>
								<div>
									{currentUser.id ? (
										authUser ? (
											<Button
												className='profile-main'
												size='sm'
												variant='outline-dark'
												onClick={handleEdit}
											>
												Edit Profile
											</Button>
										) : (
											<Button
												className='profile-main'
												size='sm'
												variant='outline-dark'
												onClick={handleFollow}
											>
												{isFollowed
													? 'Unfollow'
													: 'Follow'}
											</Button>
										)
									) : (
										<p>
											Please <a href='/login'>Log in</a>{' '}
											or <a href='/signup'>Signup</a>
										</p>
									)}
								</div>
							</Col>
							<Col
								className='user-info'
								style={{ marginLeft: '2rem' }}
							>
								<h1>{thisUser.username}</h1>
								<div>{turnKeywordsToLinks()}</div>
								<br></br>
								<bio>{thisUser.bio}</bio>
							</Col>
						</Row>
					)}
					<Row></Row>
				</Card.Body>
			</Card>
		</div>
	);
}

const mapStateToProps = (state) => {
	return { currentUser: state.auth };
};

export default connect(mapStateToProps, { setCityKeyword })(UserHeader);
