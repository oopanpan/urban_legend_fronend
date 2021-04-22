import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Col, Row } from 'react-bootstrap';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

import CommentRender from './CommentRender';
import CommentForm from './CommentForm';
import EditingForm from './EditingForm';
import LikeButton from './LikeButton';
import OnScreenKeyword from './OnScreenKeyword';

import { Link } from 'react-router-dom';

const BACKEND_API = 'http://localhost:3000/';

function PostRender({ userId, data, setUpdated }) {
	const [showMore, setShowMore] = useState(false);
	const [showComment, setShowComment] = useState(false);
	const [editing, setEditing] = useState(false);
	const [comments, setComments] = useState(data.comments);

	useEffect(() => {
		setComments(data.comments);
	}, [data]);

	const renderNestedCard = () => {
		return comments.map((comment) => {
			return (
				<CommentRender
					comments={comments}
					setComments={setComments}
					key={comment.id}
					data={comment}
				/>
			);
		});
	};

	const handleShow = () => setShowMore(!showMore);

	const handleComment = () => setShowComment(!showComment);

	const handleEdit = () => setEditing(!editing);

	const displayTime = () => {
		return data.created_at === data.updated_at
			? data.created_at.split('T')[0]
			: '(edited) ' + data.updated_at.split('T')[0];
	};

	const contentFormatting = () => {
		return (
			<>
				{data.content.slice(0, 150)}{' '}
				{showMore ? (
					<>
						{data.content.slice(150)}
						<span
							style={{
								color: 'blue',
							}}
							onClick={handleShow}
						>
							...show less
						</span>
					</>
				) : (
					<span>
						<span
							style={{
								color: 'blue',
							}}
							onClick={handleShow}
						>
							...show more
						</span>
					</span>
				)}
			</>
		);
	};

	return (
		<Row className='justify-content-center post-row'>
			<Col xs={12} md={6}>
				<Card style={{ marginBottom: '25px' }} className='post-card'>
					{/* might do another component to do some fancy stuff */}
					<Card.Header>
						<img
							className='user-avatar'
							alt='user-avatar'
							src={BACKEND_API + data.user.avatar}
							width='30'
							height='30'
						/>
						<Link
							to={`/profile/${data.user.id}`}
							style={{ marginLeft: '5px' }}
						>
							{data.user.username}
						</Link>
						<p style={{ float: 'right', color: 'grey' }}>
							{displayTime()}
						</p>
					</Card.Header>
					{editing ? (
						<EditingForm
							handleEdit={handleEdit}
							data={data}
							setUpdated={setUpdated}
						/>
					) : (
						<>
							<Card.Body className='taller-body'>
								{data.header && (
									<Card.Title>{data.header}</Card.Title>
								)}
								{data.content.length <= 150 ? (
									<Card.Text>{data.content}</Card.Text>
								) : (
									<Card.Text>{contentFormatting()}</Card.Text>
								)}
							</Card.Body>
							<Card.Footer>
								<Row
									style={{
										paddingRight: '1rem',
									}}
								>
									<Col>
										{data.keyword && (
											<OnScreenKeyword
												string={data.keyword}
											/>
										)}
									</Col>
									<LikeButton
										likedUsers={data.likes}
										dataId={data.id}
									/>
									<div className='icon-div'>
										{comments.length > 0 && comments.length}
										<Icon
											title='Comments'
											name='comments outline'
											size='large'
											onClick={handleComment}
										/>
									</div>
									<div className='icon-div'>
										{data.user.id === userId && (
											<Icon
												title='Edit'
												name='pencil'
												size='large'
												onClick={handleEdit}
											/>
										)}
									</div>
								</Row>
							</Card.Footer>{' '}
						</>
					)}
					{showComment ? (
						<Card.Body>
							{showComment && renderNestedCard()}
							<CommentForm
								comments={comments}
								setComments={setComments}
								data={data}
								targetId={data.id}
								targetType={'Post'}
							/>
						</Card.Body>
					) : null}
				</Card>
			</Col>
		</Row>
	);
}

const mapStateToProps = (state) => ({ userId: state.auth.id });

export default connect(mapStateToProps)(PostRender);
