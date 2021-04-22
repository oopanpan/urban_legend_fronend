import React from 'react';
import './HomePage.css';
import backDrop from '../assets/dark_backdrop.jpeg';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NotFound() {
	return (
		<div>
			<img src={backDrop} id='home' alt='background image' />
			<div id='main-title' style={{ color: 'white' }}>
				404 Watcha doin'
			</div>
			<img
				id='not-found-img'
				src='https://media.makeameme.org/created/sorry-sir-are.jpg'
				alt='girl looking back at your all weird'
			/>
			<div className='button-div'>
				<Button as={Link} to='/urban' variant='outline-dark' size='lg'>
					Back to City Search
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

export default NotFound;
