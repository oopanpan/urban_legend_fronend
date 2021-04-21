import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import { Icon } from 'semantic-ui-react';
import { newLike, unLike } from '../actions/likeActions';

function LikeButton({ newLike, unLike, userId, likedUsers, dataId }) {
	const [userArr, setUserArr] = useState(likedUsers);
	console.log(userArr);
	const userLiked = userArr.find((like) => like.user_id === userId);
	const count = userArr.length;

	const handleLike = () => {
		if (!userLiked) {
			const likeObj = {
				user_id: userId,
				post_id: dataId,
			};
			newLike(likeObj, userArr, setUserArr);
		} else {
			unLike(userLiked.id, userArr, setUserArr);
		}
	};
	return (
		<>
			{userLiked ? (
				<div className='icon-div'>
					{count > 0 && count}
					<Icon
						title='Unlike Button'
						name='heart'
						size='large'
						color='red'
						onClick={handleLike}
					/>
				</div>
			) : (
				<div className='icon-div'>
					{count > 0 && count}
					<Icon
						title='Like Button'
						name='heart outline'
						size='large'
						onClick={handleLike}
						disabled={!userId}
					/>
				</div>
			)}
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		userId: state.auth.id,
	};
};

export default connect(mapStateToProps, { newLike, unLike })(LikeButton);
