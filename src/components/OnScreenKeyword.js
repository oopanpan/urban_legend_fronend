import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { setCityKeyword } from '../actions/postActions';

function OnScreenKeyword({ setCityKeyword, string }) {
	const handleClick = (str) => {
		setCityKeyword(str);
	};

	const capitalize = (string) =>
		`${string[0].toUpperCase()}` + `${string.slice(1)}`;

	const renderArr = () => {
		const strArr = string.split(' ');
		return strArr.map((str) => {
			return (
				<Link to='/discuss' onClick={() => handleClick(str)} key='str'>
					#{capitalize(str)}
				</Link>
			);
		});
	};

	return <>{renderArr()}</>;
}

export default connect(null, { setCityKeyword })(OnScreenKeyword);
