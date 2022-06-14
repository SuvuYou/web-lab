import "./DeleteModal.scss";

const DeleteModal = ({ onCloseModal, onConfirm, label }) => {
  return (
    <>
      <div className="overlay" onClick={() => onCloseModal()} />
      <div className="delete-form">
        <div className="delete-label">{label}</div>
        <button className="delete-modal-button" onClick={onConfirm}>
          Confirm
        </button>
        <button
          className="cancel-modal-button"
          onClick={() => {
            onCloseModal();
          }}
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default DeleteModal;
