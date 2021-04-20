import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import {
	setAllConts,
	setUrban,
	clearUrban,
	getAllUrbans,
	getUrbansForCont,
} from '../actions/cityActions';

const UrbanSearch = ({
	allConts,
	allUrbans,
	setAllConts,
	getUrbansForCont,
	setUrban,
	clearUrban,
	getAllUrbans,
	postKeyword,
}) => {
	useEffect(() => {
		setAllConts();
		getAllUrbans();
	}, []);

	const renderContsOption = () => {
		return allConts.map((cont) => (
			<option key={cont.name} value={`${cont.name}`}>
				{cont.name}
			</option>
		));
	};

	const renderUrbanOption = () => {
		return allUrbans.map((urban) => (
			<option key={urban.name} value={urban.name}>
				{urban.name}
			</option>
		));
	};

	const handleCont = (e) => {
		const selectedCont = allConts.find(
			(cont) => cont.name === e.target.value
		);
		selectedCont ? getUrbansForCont(selectedCont.href) : getAllUrbans();
	};

	const handleUrban = async (e) => {
		const foundCity = allUrbans.find(
			(urban) => urban.name === e.target.value
		);
		foundCity ? setUrban(foundCity.href) : clearUrban();
	};

	return (
		<Row
			className='justify-content-center'
			style={{ marginTop: '1rem', marginBottom: '1rem' }}
		>
			{/* <Form> */}
			<Col xs={12} md={4}>
				<Form.Label>Urban City</Form.Label>
				<Form.Control
					as='input'
					list='urban-list'
					onChange={handleUrban}
					placeholder='Destination'
				/>
				<datalist id='urban-list'>
					{allUrbans && renderUrbanOption()}
				</datalist>
			</Col>
			<Col xs={12} md={4}>
				<Form.Label>Filter by Continent</Form.Label>
				<Form.Control as='select' onChange={handleCont}>
					<option value='none' style={{ color: 'grey' }}>
						Global
					</option>
					{allConts && renderContsOption()}
				</Form.Control>
			</Col>
			{/* </Form> */}
		</Row>
	);
};

const mapStateToProps = (state) => {
	return {
		allConts: state.geo.allConts,
		allUrbans: state.geo.urbans,
		postKeyword: state.post.keyword,
	};
};

export default connect(mapStateToProps, {
	setAllConts,
	setUrban,
	clearUrban,
	getAllUrbans,
	getUrbansForCont,
})(UrbanSearch);
