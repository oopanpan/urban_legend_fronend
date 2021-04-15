import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchPosts, newUpdate } from '../actions/postActions';
import ContentRender from './ContentRender';

function ForumDisplay({ posts, fetchPosts, update, newUpdate }) {
	useEffect(() => {
		fetchPosts();
		newUpdate(false);
	}, [update]);

	const renderPosts = () => {
		return posts.map((post) => <ContentRender key={post.id} data={post} />);
	};

	return <div className='container'>{posts && renderPosts()}</div>;
}

const mapStateToProps = (state) => {
	return {
		posts: state.post.posts,
		update: state.post.update,
	};
};

export default connect(mapStateToProps, { fetchPosts, newUpdate })(
	ForumDisplay
);
