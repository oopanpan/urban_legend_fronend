import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import CommentForm from './CommentForm';

function ContentRender({ data }) {
	const [showMore, setShowMore] = useState(false);
	const [showComment, setShowComment] = useState(false);

	const renderNestedCard = (arr) => {
		arr.map((ele) => {
			console.log(ele);
			return <ContentRender data={ele} />;
		});
	};

	const handleShow = () => setShowMore(!showMore);

	const handleComment = () => setShowComment(!showComment);

	return (
		<>
			<Card>
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
				</Card.Footer>
				<Card.Body>
					{showComment && <CommentForm />}
					{data.comments && renderNestedCard(data.comments)}
				</Card.Body>
			</Card>
		</>
	);
}

export default ContentRender;
