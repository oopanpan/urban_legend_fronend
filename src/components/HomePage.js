import React from 'react';
import './HomePage.css';
import backDrop from '../assets/blue_backdrop.png';
import cloud from '../assets/white_cloud.png';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function HomePage() {
	return (
		<div>
			{/* <div id='home' style={{ backgroundImage: `url(${backDrop})` }}> */}
			<img src={backDrop} id='home' />
			<div id='main-title'>Urban Legend</div>
			<div id='fade-in'>
				<p>Connecting made easy</p>
			</div>
			<div id='cloud-div'>
				<img
					src={cloud}
					className='cloud-img'
					width='95px'
					height='95px'
					style={{
						top: '8%',
						left: '35%',
					}}
				/>
				<img
					src={cloud}
					className='cloud-img'
					width='120px'
					height='120px'
					style={{
						top: '20%',
						left: '60%',
						zIndex: '5',
						animationDelay: '2s',
					}}
				/>
				<img
					src={cloud}
					className='cloud-img'
					width='75px'
					height='75px'
					style={{
						top: '32%',
						left: '25%',
						zIndex: '-1',
						animationDelay: '5s',
					}}
				/>
			</div>
			<div className='button-div'>
				<Button as={Link} to='/urban' variant='outline-dark' size='lg'>
					Start Exploring
				</Button>
			</div>
			<div className='button-div'>
				<Button
					as={Link}
					to='/discuss'
					variant='outline-dark'
					size='lg'
				>
					Enter Discussion
				</Button>
			</div>
		</div>
	);
}

export default HomePage;
