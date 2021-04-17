import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
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
				<Button onClick={handleLike}>
					{count > 0 && count}
					<FavoriteIcon />
				</Button>
			) : (
				<Button onClick={handleLike} disabled={!userId}>
					{count > 0 && count}
					<FavoriteBorderIcon />
				</Button>
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
