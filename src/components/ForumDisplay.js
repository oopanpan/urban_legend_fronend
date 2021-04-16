import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchPosts, newUpdate, nextPage } from '../actions/postActions';
import PostRender from './PostRender';

function ForumDisplay({
	currentPage,
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
		if (currentPage) {
			console.log(currentPage);
			fetchPosts(currentPage);
			newUpdate(false);
		}
	}, [update]);

	useEffect(() => {
		if (isBottom) {
			setIsBottom(false);
			fetchPosts(currentPage);
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
		if (scrollTop + window.innerHeight + 50 >= scrollHeight) {
			setIsBottom(true);
		}
	};

	const renderPosts = (posts) => {
		return posts.map((post) => <PostRender key={post.id} data={post} />);
	};

	return <div className='container'>{posts && renderPosts(posts)}</div>;
}

const mapStateToProps = (state) => {
	console.log(state);
	return {
		posts: state.post.posts,
		currentPage: state.post.page,
		update: state.post.update,
	};
};

export default connect(mapStateToProps, { nextPage, fetchPosts, newUpdate })(
	ForumDisplay
);
