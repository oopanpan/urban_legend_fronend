import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import {
	nextPage,
	resetPage,
	fetchPosts,
	clearPosts,
	newUpdate,
} from '../actions/postActions';
import PostRender from './PostRender';

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
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	useEffect(() => {
		fetchPosts(keyword, currentPage);
		return () => {
			resetPage();
			clearPosts();
		};
	}, [keyword]);

	useEffect(() => {
		if (currentPage < totalPage && isBottom) {
			setIsBottom(false);
			nextPage();
			fetchPosts(keyword, currentPage + 1);
		}
	}, [isBottom]);

	const handleNext = () => {};

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
			className='container justify-content-center'
			style={{ marginTop: '6rem' }}
		>
			{posts && renderPosts(posts)}
			<h1>Bottom of the page</h1>
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
		keyword: keyword.toLowerCase(),
	};
};

export default connect(mapStateToProps, {
	fetchPosts,
	clearPosts,
	newUpdate,
	nextPage,
	resetPage,
})(ForumDisplay);
