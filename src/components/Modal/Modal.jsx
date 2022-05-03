import { useRef } from "react";
import ReactDom from "react-dom";

import "./Modal.css";
const Modal = ({ setShowModal }) => {
  // close the modal when clicking outside the modal
  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
    }
  };

  return ReactDom.createPortal(
    <div className="modal-container" ref={modalRef} onClick={closeModal}>
      <div className="modal">
        <h2>Planet Name: Whatever</h2>
        <button onClick={() => setShowModal(false)} />
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default Modal;
