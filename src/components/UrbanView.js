import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux';

const UrbanView = ({ city }) => {
	const [images, setImages] = useState({});
	const [scoreLink, setScoreLink] = useState(null);
	const [scores, setScores] = useState(null);
	const [summary, setSummary] = useState(null);
	const [mainScore, setMainScore] = useState(null);

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

	const renderScores = () => {
		return (
			scores &&
			scores.map((score) => (
				<p key={score.name}>
					{score.name}: {score.score_out_of_10.toFixed(2)}
				</p>
			))
		);
	};

	return (
		<div className='container'>
			{city ? (
				<div>
					<h1>{city.full_name}</h1>
					<h4>Teleport Score: {mainScore}</h4>
					<h5 dangerouslySetInnerHTML={{ __html: summary }}></h5>
					<img src={images.web} />
					{renderScores()}
					<ButtonGroup>
						<Button>See post for this place</Button>
						<Button>All Post</Button>
						<Button>Start Writing Post</Button>
					</ButtonGroup>
				</div>
			) : (
				<div>
					<h1>Default Render when there's nothing to see</h1>
					<Button>A Button that leads to the forum</Button>
				</div>
			)}
		</div>
	);
};

const mapStateToProps = (state) => ({ city: state.geo.selectedUrban });

export default connect(mapStateToProps)(UrbanView);
