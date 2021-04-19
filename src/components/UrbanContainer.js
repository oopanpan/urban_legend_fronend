import React from 'react';
import UrbanSearch from './UrbanSearch';
import UrbanView from './UrbanView';

export default function UrbanContainer() {
	return (
		<div className='d-flex justify-content-center'>
			<UrbanSearch />
			<UrbanView />
		</div>
	);
}
