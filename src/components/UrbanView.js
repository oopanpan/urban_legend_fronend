import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { setCityKeyword } from '../actions/postActions';
import './UrbanView.css';

const UrbanView = ({ city, setCityKeyword }) => {
	const [images, setImages] = useState({});
	const [scoreLink, setScoreLink] = useState(null);
	const [scores, setScores] = useState(null);
	const [summary, setSummary] = useState(null);
	const [mainScore, setMainScore] = useState(null);
	const [width, setWindowWidth] = useState(0);

	useEffect(() => {
		city &&
			axios.get(city['_links']['ua:images'].href).then((r) => {
				setImages({
					...images,
					web: r.data.photos[0].image.web,
					mobile: r.data.photos[0].image.mobile,
				});
				setScoreLink(city['_links']['ua:scores'].href);
			});
	}, [city]);

	useEffect(() => {
		scoreLink &&
			axios.get(scoreLink).then((r) => {
				setScores(r.data.categories);
				setSummary(r.data.summary);
				setMainScore(r.data.teleport_city_score.toFixed(2));
			});
	}, [scoreLink]);

	useEffect(() => {
		updateDimensions();
		window.addEventListener('resize', updateDimensions);
		return () => {
			window.removeEventListener('resize', updateDimensions);
		};
	}, []);

	const updateDimensions = () => {
		const width = window.innerWidth;
		setWindowWidth(width);
	};

	const renderScores = () => {
		return (
			scores &&
			scores.map((score) => (
				<Col xs={6} md={4} key={score.name}>
					{score.name}: {score.score_out_of_10.toFixed(2)}
				</Col>
			))
		);
	};

	return (
		<>
			{city ? (
				<>
					<Row className='urban-container'>
						<div className='img-container'>
							<img
								src={width > 800 ? images.web : images.mobile}
							/>
							<div>{city.name}</div>
						</div>
					</Row>
					<Row className='urban-container'>
						<Col className='left-container' xs={12} md={6}>
							<h3>Overall Score: {mainScore}</h3>
							<h5
								dangerouslySetInnerHTML={{ __html: summary }}
							></h5>
						</Col>
						<Col xs={12} md={6}>
							<Row className='button-row'>
								<Button
									as={Link}
									to='/discuss'
									onClick={() => setCityKeyword(city.name)}
									variant='outline-dark'
								>
									See Post About This City
								</Button>
							</Row>
							<Row className='button-row'>
								<Button
									onClick={() => setCityKeyword(city.name)}
									variant='outline-dark'
									as={Link}
									to='/newpost'
								>
									Write About This City
								</Button>
							</Row>
							<Row className='button-row'>
								<Button
									variant='outline-dark'
									as={Link}
									to='/discuss'
									onClick={() => setCityKeyword('Global')}
								>
									See All Post
								</Button>
							</Row>
						</Col>
						{/* <Col className='left-container' xs={12} md={6}>
							{renderScores()}
						</Col> */}
					</Row>
					<Row className='left-container'>{renderScores()}</Row>
					{/* <ButtonGroup style={{ margin: '3rem' }}>
						<Button>See post for this place</Button>
						<Button>All Post</Button>
						<Button>Start Writing Post</Button>
					</ButtonGroup> */}
					<div style={{ margin: '5rem' }}>-</div>
				</>
			) : (
				<div>
					<h1>Your New Journey Starts Here</h1>
					<Button>See what people are talking about</Button>
				</div>
			)}
		</>
	);
};

const mapStateToProps = (state) => ({ city: state.geo.selectedUrban });

export default connect(mapStateToProps, { setCityKeyword })(UrbanView);
