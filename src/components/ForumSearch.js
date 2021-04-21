import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, FormControl, Button, Row, Col } from 'react-bootstrap';

import { setCityKeyword } from '../actions/postActions';

function ForumSearch({ keyword, setCityKeyword, setIsBottom }) {
	const [search, setSearch] = useState(keyword);

	useEffect(() => {
		setSearch(keyword);
	}, [keyword]);

	const handleChange = (e) => {
		setSearch(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setCityKeyword(e.target.keyword.value);
		setIsBottom(false);
	};
	return (
		<Row
			className='justify-content-center'
			style={{ marginBottom: '2rem' }}
		>
			<Col xs={12} md={6}>
				<Form
					onSubmit={handleSubmit}
					inline
					className='justify-content-center'
				>
					<FormControl
						type='text'
						name='keyword'
						value={search}
						onChange={handleChange}
					/>
					<Button variant='outline-dark' type='submit'>
						Search
					</Button>
				</Form>
			</Col>
		</Row>
	);
}

const mapStateToProps = (state) => {
	return {
		keyword: state.post.keyword,
	};
};

export default connect(mapStateToProps, { setCityKeyword })(ForumSearch);
