import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import EditingForm from './EditingForm';
import CommentForm from './CommentForm';
import api from '../service/api';
import { newUpdate } from '../actions/postActions';

const BACKEND_API = 'http://localhost:3000/';

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
	console.log(thisComment);

	return (
		<>
			{thisComment ? (
				<Card>
					{/* might do another component to do some fancy stuff */}
					<Card.Header>
						<img
							alt='user-avatar'
							src={BACKEND_API + thisComment.user.avatar}
							width='20'
							height='20'
						/>
						{data.user.username}
						{thisComment.user.username}
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
								<Button onClick={handleComment}>
									comment
									{thisComment.comments.length > 0 &&
										`(${thisComment.comments.length})`}
								</Button>
								{thisComment.user.id === userId && (
									<Button onClick={handleEdit}>Edit</Button>
								)}
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
