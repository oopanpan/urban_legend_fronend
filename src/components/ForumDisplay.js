import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { nextPage, fetchPosts, newUpdate } from '../actions/postActions';
import PostRender from './PostRender';

function ForumDisplay({
	currentPage,
	totalPage,
	nextPage,
	posts,
	fetchPosts,
	update,
	newUpdate,
}) {
	const [isBottom, setIsBottom] = useState(false);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	useEffect(() => {
		fetchPosts(currentPage);
		newUpdate(false);
	}, [update]);

	useEffect(() => {
		if (currentPage < totalPage && isBottom) {
			setIsBottom(false);
			nextPage();
			fetchPosts(currentPage + 1);
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
		if (scrollTop + window.innerHeight + 2 >= scrollHeight) {
			setIsBottom(true);
		}
	};

	const renderPosts = (posts) => {
		return posts.map((post) => <PostRender key={post.id} data={post} />);
	};

	return (
		<div className='container'>
			{posts && renderPosts(posts)}
			<h1>Bottom of the page</h1>
		</div>
	);
}

const mapStateToProps = (state) => {
	console.log(state);
	return {
		posts: state.post.posts,
		currentPage: state.post.page,
		totalPage: state.post.totalPage,
		update: state.post.update,
	};
};

export default connect(mapStateToProps, { fetchPosts, newUpdate, nextPage })(
	ForumDisplay
);
