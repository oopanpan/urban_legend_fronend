import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

function ContentRender({ data }) {
	const renderNestedCard = (arr) => {
		arr.map((ele) => <ContentRender data={ele} />);
	};
	return (
		<>
			<Card>
				<Card.Header>{}</Card.Header>
				<Card.Body>
					{data.header && <Card.Title>{data.header}</Card.Title>}
					<Card.Text>{data.content}</Card.Text>
					<Button>comment</Button>
					{/* {data.comments && renderNestedCard(data.comments)} */}
				</Card.Body>
			</Card>
		</>
	);
}

export default ContentRender;
