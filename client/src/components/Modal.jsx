import PropTypes from 'prop-types'

const Modal = ({ isOpen, onCancel, onConfirm }) => {
    if (!isOpen) {
        return null; // Don't render the dialog if it's not open
    }

    return (
        <div className="confirmation-dialog">
            <p>Are you sure you want to delete this contact?</p>
            <button onClick={onConfirm}>Delete</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
}

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired, // Define prop validation for 'isOpen'
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
}

export default Modal