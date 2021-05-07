import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import EditingForm from './EditingForm';
import CommentForm from './CommentForm';
import api from '../service/api';
import { newUpdate } from '../actions/postActions';

function CommentRender({
	comments,
	setComments,
	newUpdate,
	update,
	userId,
	data,
}) {
	const [showMore, setShowMore] = useState(false);
	const [showComment, setShowComment] = useState(false);
	const [thisComment, setThisComment] = useState(null);
	const [isUpdate, setIsUpdate] = useState(false);
	const [editing, setEditing] = useState(false);

	useEffect(() => {
		const getOneComment = async () => {
			const res = await api.comment.getOneComment(data.id);
			setThisComment(res);
		};
		getOneComment();
		setIsUpdate(false);
	}, [isUpdate]);

	const renderNestedCard = (arr) => {
		return arr.map((ele) => {
			return <CommentRender userId={userId} key={ele.id} data={ele} />;
			// return <ContentRender key={ele.id} data={ele} />;
		});
	};

	const handleShow = () => setShowMore(!showMore);

	const handleComment = () => setShowComment(!showComment);

	const handleEdit = () => setEditing(!editing);

	const displayTime = () => {
		return thisComment.created_at === thisComment.updated_at
			? thisComment.created_at.split('T')[0]
			: '(edited) ' + thisComment.updated_at.split('T')[0];
	};

	return (
		<>
			{thisComment ? (
				<Card className='comment-card'>
					{/* Will extract into standalone component */}
					<Card.Header>
						<img
							alt='user-avatar'
							src={api.AVATAR + thisComment.user.avatar}
							width='20'
							height='20'
						/>
						<Link
							to={`/profile/${thisComment.user.id}`}
							style={{ marginLeft: '5px' }}
						>
							{thisComment.user.username}
						</Link>
						<p style={{ float: 'right', color: 'grey' }}>
							{displayTime()}
						</p>
					</Card.Header>
					{editing ? (
						<EditingForm
							commentId={data.id}
							comments={comments}
							setComments={setComments}
							setIsUpdate={setIsUpdate}
							handleEdit={handleEdit}
							data={thisComment}
						/>
					) : (
						<>
							<Card.Body>
								{thisComment.content.length <= 150 ? (
									<Card.Text>{thisComment.content}</Card.Text>
								) : (
									<Card.Text>
										{thisComment.content.slice(0, 150)}
										{showMore ? (
											<>
												{thisComment.content.slice(150)}
												<span
													style={{
														color: 'blue',
														cursor: 'pointer',
													}}
													onClick={handleShow}
												>
													...show less
												</span>
											</>
										) : (
											<>
												<span
													style={{
														color: 'blue',
														cursor: 'pointer',
													}}
													onClick={handleShow}
												>
													...show more
												</span>
											</>
										)}
									</Card.Text>
								)}
							</Card.Body>
							<Card.Footer>
								<Row>
									<Col></Col>
									<div className='icon-div'>
										{thisComment.comments.length > 0 &&
											thisComment.comments.length}
										<Icon
											title='Comments'
											name='comments outline'
											size='large'
											onClick={handleComment}
										/>
									</div>
									{thisComment.user.id === userId && (
										<div className='icon-div'>
											<Icon
												title='Edit'
												name='pencil'
												size='large'
												onClick={handleEdit}
											/>
										</div>
									)}
								</Row>
							</Card.Footer>
						</>
					)}
					{showComment ? (
						<Card.Body>
							{renderNestedCard(thisComment.comments)}
							<CommentForm
								thisComment={thisComment}
								targetId={thisComment.id}
								setIsUpdate={setIsUpdate}
								targetType={'Comment'}
							/>
						</Card.Body>
					) : null}
				</Card>
			) : null}
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		userId: state.auth.id,
		update: state.post.update,
	};
};

export default connect(mapStateToProps, { newUpdate })(CommentRender);
