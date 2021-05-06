import React from 'react';
import { Icon } from 'semantic-ui-react';

const githubLink = 'https://github.com/oopanpan';

function Footer() {
	return (
		<div
			style={{
				position: 'fixed',
				width: '100%',
				height: '50px',
				bottom: '0',
				backgroundColor: 'white',
				color: 'black',
				textAlign: 'center',
				display: 'flex',
				justifyContent: 'center',
			}}
		>
			<div style={{ padding: '1rem' }}>
				Pan Li 2021
				<Icon
					onClick={() => window.open(githubLink, '_blank')}
					name='github'
					size='large'
				/>
			</div>
		</div>
	);
}

export default Footer;
