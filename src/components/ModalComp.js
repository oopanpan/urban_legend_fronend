import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { displayModal } from '../actions/modalActions';

function ModalComp({ displayModal, modal }) {
	const handleClose = () => {
		displayModal(false);
	};

	const renderButtons = (arr) => {
		return arr.map((button) => {
			if (button.path) {
				return (
					<Button
						variant='outline-dark'
						as={Link}
						to={button.path}
						title={button.content}
						key={button.content}
						onClick={handleClose}
					>
						{button.content}
					</Button>
				);
			}
			return (
				<Button
					variant='outline-dark'
					key={button.content}
					onClick={handleClose}
				>
					{button.content}
				</Button>
			);
		});
	};

	return (
		<>
			{modal && (
				<Modal
					show={modal.display}
					onHide={handleClose}
					backdrop='static'
					keyboard={false}
					size='lg'
					aria-labelledby='contained-modal-title-vcenter'
					centered
				>
					<Modal.Header closeButton>
						<Modal.Title>{modal.header}</Modal.Title>
					</Modal.Header>
					<Modal.Body>{modal.body}</Modal.Body>
					<Modal.Footer>{renderButtons(modal.buttons)}</Modal.Footer>
				</Modal>
			)}
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		modal: state.modal,
	};
};

export default connect(mapStateToProps, { displayModal })(ModalComp);
