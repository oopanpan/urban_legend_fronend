import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';

import { displayModal } from '../actions/modalActions';

function ModalComp({ displayModal, modal }) {
	const handleClose = () => {
		displayModal(false);
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
					<Modal.Footer>
						{/* <Button variant='secondary' onClick={handleClose}>
						Close
					</Button>
					<Button variant='primary'>Understood</Button> */}
					</Modal.Footer>
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
