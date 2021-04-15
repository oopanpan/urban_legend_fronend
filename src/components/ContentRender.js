import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import CommentForm from './CommentForm';

function ContentRender({ data }) {
	const [showMore, setShowMore] = useState(false);
	const [showComment, setShowComment] = useState(false);
	const [showCommentForm, setShowCommentForm] = useState(false);

	const renderNestedCard = (arr) => {
		return arr.map((ele) => {
			console.log(ele);
			return <ContentRender key={ele.id} data={ele} />;
		});
	};

	const handleShow = () => setShowMore(!showMore);

	const handleComment = () => setShowComment(!showComment);

	const handleForm = () => setShowCommentForm(!showCommentForm);

	return (
		<>
			<Card>
				{/* might do another component to do some fancy stuff */}
				<Card.Header>{data.user.username}</Card.Header>
				<Card.Body>
					{data.header && <Card.Title>{data.header}</Card.Title>}
					{data.content.length <= 300 ? (
						<Card.Text>{data.content}</Card.Text>
					) : (
						<Card.Text>
							{data.content.slice(0, 300)}
							{showMore ? (
								<p>
									<span>{data.content.slice(300)}</span>
									<p oncClick={handleShow}>show less</p>
								</p>
							) : (
								<p onClick={handleShow}>
									<nobr>...show more</nobr>
								</p>
							)}
						</Card.Text>
					)}
				</Card.Body>
				<Card.Footer>
					<Button>Like</Button>
					<Button onClick={handleComment}>comment</Button>
					<Button onClick={handleForm}>add comment</Button>
				</Card.Footer>
				{showComment || showCommentForm ? (
					<Card.Body>
						{showCommentForm && (
							<CommentForm
								data={data}
								targetId={data.id}
								targetType={data.header ? 'Post' : 'Comment'}
							/>
						)}
						{showComment && renderNestedCard(data.comments)}
					</Card.Body>
				) : null}
			</Card>
		</>
	);
}

export default ContentRender;
