import React from 'react';
import './HomePage.css';
import backDrop from '../assets/blue_backdrop.png';
import cloud from '../assets/white_cloud.png';

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
					width='100px'
					height='100'
					style={{
						top: '8%',
						left: '35%',
					}}
				/>
				<img
					src={cloud}
					className='cloud-img'
					width='110px'
					height='110px'
					style={{
						top: '20%',
						left: '60%',
						zIndex: '5',
						animationDelay: '1s',
					}}
				/>
				<img
					src={cloud}
					className='cloud-img'
					width='80px'
					height='80px'
					style={{
						top: '32%',
						left: '25%',
						zIndex: '-1',
						animationDelay: '3s',
					}}
				/>
			</div>
		</div>
	);
}

export default HomePage;
