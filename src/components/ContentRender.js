import React, { useState, useEffect } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import CommentRender from './CommentRender';

import CommentForm from './CommentForm';
import EditingForm from './EditingForm';

function ContentRender({ userId, data }) {
	const [showMore, setShowMore] = useState(false);
	const [showComment, setShowComment] = useState(false);
	const [editing, setEditing] = useState(false);

	const renderNestedCard = (arr) => {
		return arr.map((ele) => {
			return <CommentRender key={ele.id} data={ele} />;
			// return <ContentRender key={ele.id} data={ele} />;
		});
	};

	const handleShow = () => setShowMore(!showMore);

	const handleComment = () => setShowComment(!showComment);

	const handleEdit = () => setEditing(!editing);

	return (
		<>
			<Card>
				{/* might do another component to do some fancy stuff */}
				<Card.Header>{data.user.username}</Card.Header>
				{editing ? (
					<EditingForm handleEdit={handleEdit} data={data} />
				) : (
					<>
						<Card.Body>
							{data.header && (
								<Card.Title>{data.header}</Card.Title>
							)}
							{data.content.length <= 150 ? (
								<Card.Text>{data.content}</Card.Text>
							) : (
								<Card.Text>
									{data.content.slice(0, 150)}
									{showMore ? (
										<>
											{data.content.slice(150)}
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
							<Button onClick={handleComment}>
								comment ({data.comments.length})
							</Button>
							{data.user.id === userId && (
								<Button onClick={handleEdit}>Edit</Button>
							)}
						</Card.Footer>{' '}
					</>
				)}
				{showComment ? (
					<Card.Body>
						{showComment && renderNestedCard(data.comments)}
						<CommentForm
							data={data}
							targetId={data.id}
							targetType={'Post'}
						/>
					</Card.Body>
				) : null}
			</Card>
		</>
	);
}

const mapStateToProps = (state) => ({ userId: state.auth.id });

export default connect(mapStateToProps)(ContentRender);
