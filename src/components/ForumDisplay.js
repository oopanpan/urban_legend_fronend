import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './ForumDisplay.css';

import {
	nextPage,
	resetPage,
	fetchPosts,
	clearPosts,
	newUpdate,
} from '../actions/postActions';
import PostRender from './PostRender';
import ForumSearch from './ForumSearch';

function ForumDisplay({
	currentPage,
	totalPage,
	nextPage,
	resetPage,
	posts,
	keyword,
	fetchPosts,
	clearPosts,
}) {
	const [isBottom, setIsBottom] = useState(false);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	console.log(isBottom);

	useEffect(() => {
		fetchPosts(keyword, 0);
		return () => {
			resetPage();
			clearPosts();
		};
	}, [clearPosts, fetchPosts, keyword, resetPage]);

	useEffect(() => {
		if (currentPage < totalPage && isBottom) {
			setIsBottom(false);
			nextPage();
			fetchPosts(keyword, currentPage + 1);
		}
	}, [currentPage, fetchPosts, isBottom, keyword, nextPage, totalPage]);

	const handleScroll = () => {
		const scrollTop =
			(document.documentElement && document.documentElement.scrollTop) ||
			document.body.scrollTop;
		const scrollHeight =
			(document.documentElement &&
				document.documentElement.scrollHeight) ||
			document.body.scrollHeight;
		if (scrollTop + window.innerHeight + 10 >= scrollHeight) {
			setIsBottom(true);
		}
	};

	const renderPosts = (posts) => {
		return posts.map((post) => <PostRender key={post.id} data={post} />);
	};

	return (
		<div
			id='forum-container'
			className='container justify-content-center'
			style={{ marginTop: '3rem' }}
		>
			<ForumSearch setIsBottom={setIsBottom} />
			{posts && renderPosts(posts)}
			<Row className='justify-content-center'>
				<Col xs={12} md={6} style={{ textAlign: 'center' }}>
					<h1>Didn't see what you came for?</h1>
				</Col>
			</Row>
			<Row className='button-row' style={{ margin: '2rem' }}>
				<Button
					as={Link}
					to='/newpost'
					title='New post link'
					variant='outline-dark'
				>
					Spark a convo!
				</Button>
			</Row>
		</div>
	);
}

const mapStateToProps = (state) => {
	const { posts, page, totalPage, update, keyword } = state.post;
	return {
		posts,
		currentPage: page,
		totalPage,
		update,
		keyword: keyword,
	};
};

export default connect(mapStateToProps, {
	fetchPosts,
	clearPosts,
	newUpdate,
	nextPage,
	resetPage,
})(ForumDisplay);
