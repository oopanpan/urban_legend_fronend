import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import CommentForm from './CommentForm';
import { connect } from 'react-redux';

import api from '../service/api';

function CommentRender({ userId, data }) {
	const [showMore, setShowMore] = useState(false);
	const [showComment, setShowComment] = useState(false);
	const [showCommentForm, setShowCommentForm] = useState(false);
	const [thisComment, setThisComment] = useState(null);

	useEffect(() => {
		api.comment.getOneComment(data.id).then((r) => setThisComment(r));
	}, []);

	const renderNestedCard = (arr) => {
		return arr.map((ele) => {
			return <CommentRender data={ele} />;
			// return <ContentRender key={ele.id} data={ele} />;
		});
	};

	const handleShow = () => setShowMore(!showMore);

	const handleComment = () => setShowComment(!showComment);

	const handleForm = () => setShowCommentForm(!showCommentForm);

	const handleEdit = () => {};

	return (
		<>
			{thisComment && (
				<Card>
					{/* might do another component to do some fancy stuff */}
					<Card.Header>{thisComment.user.username}</Card.Header>
					<Card.Body>
						{thisComment.content.length <= 300 ? (
							<Card.Text>{thisComment.content}</Card.Text>
						) : (
							<Card.Text>
								{thisComment.content.slice(0, 150)}
								{showMore ? (
									<>
										{thisComment.content.slice(150)}
										<span
											style={{ color: 'blue' }}
											onClick={handleShow}
										>
											...show less
										</span>
									</>
								) : (
									<>
										<span
											style={{ color: 'blue' }}
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
						<Button>Like</Button>
						<Button onClick={handleComment}>comment</Button>
						<Button onClick={handleForm}>add comment</Button>
						{data.user.id === userId && (
							<Button onClick={handleEdit}>Edit</Button>
						)}
					</Card.Footer>
					{showComment || showCommentForm ? (
						<Card.Body>
							{showCommentForm && (
								<CommentForm
									thisComment={thisComment}
									targetId={thisComment.id}
									targetType={'Comment'}
								/>
							)}
							{showComment &&
								renderNestedCard(thisComment.comments)}
						</Card.Body>
					) : null}
				</Card>
			)}
		</>
	);
}

const mapStateToProps = (state) => ({ userId: state.auth.id });

export default connect(mapStateToProps)(CommentRender);
