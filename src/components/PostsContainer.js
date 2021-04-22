import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PostRender from './PostRender';
import api from '../service/api';
import NotFound from './NotFound';

function PostsContainer({ routerProps, currentUser }) {
	const [data, setData] = useState(null);
	const [updated, setUpdated] = useState(false);
	const [notFound, setNotFound] = useState(false);

	useEffect(() => {
		api.post
			.getOnePost(routerProps.match.params.id)
			.then((r) => {
				console.log(r);
				setData(r);
				setUpdated(false);
			})
			.catch(() => setNotFound(true));
	}, [updated]);
	return (
		<>
			{notFound ? (
				<NotFound />
			) : (
				<div
					className='container justify-content-center'
					style={{ marginTop: '2rem', marginBottom: '2rem' }}
				>
					{data && (
						<PostRender
							userId={currentUser.id}
							data={data.post}
							setUpdated={setUpdated}
						/>
					)}
				</div>
			)}
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		currentUser: state.auth,
	};
};

export default connect(mapStateToProps)(PostsContainer);
