import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchPosts } from '../actions/postActions';
import ContentRender from './ContentRender';

function ForumDisplay({ posts, fetchPosts }) {
	useEffect(() => {
		fetchPosts();
	}, []);

	const renderPosts = () => {
		return posts.map((post) => <ContentRender data={post} />);
	};

	return <div className='container'>{posts && renderPosts()}</div>;
}

const mapStateToProps = (state) => {
	return {
		posts: state.post.posts,
	};
};

export default connect(mapStateToProps, { fetchPosts })(ForumDisplay);
