import React from 'react';
import UrbanSearch from './UrbanSearch';
import UrbanView from './UrbanView';

export default function UrbanContainer() {
	return (
		<div className='container justify-content-center'>
			<h1 style={{ marginTop: '2rem' }}>Urban City Search</h1>
			<UrbanSearch />
			<UrbanView />
		</div>
	);
}
