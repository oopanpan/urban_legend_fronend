import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PostRender from './PostRender';

import api from '../service/api';

function PostsContainer({ routerProps, currentUser }) {
	const [data, setData] = useState(null);
	const [updated, setUpdated] = useState(false);

	useEffect(() => {
		api.post.getOnePost(routerProps.match.params.id).then((r) => {
			console.log(r);
			setData(r);
			setUpdated(false);
		});
	}, [updated]);
	return (
		// <div></div>
		<div className='container justify-center'>
			{data && (
				<PostRender
					userId={currentUser.id}
					data={data.post}
					setUpdated={setUpdated}
				/>
			)}
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		currentUser: state.auth,
	};
};

export default connect(mapStateToProps)(PostsContainer);
