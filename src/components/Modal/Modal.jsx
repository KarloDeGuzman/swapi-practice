import { useRef } from 'react';
import ReactDom from 'react-dom';

import './Modal.css';
const Modal = ({ setShowModal, singlePlanetData }) => {
  // close the modal when clicking outside the modal
  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
    }
  };

  const { name, diameter, climate, population } = singlePlanetData[0];

  return ReactDom.createPortal(
    <div className="modal-container" ref={modalRef} onClick={closeModal}>
      <div className="modal">
        <h2>Planet Name: {name}</h2>
        <h2>Diameter: {diameter}</h2>
        <h2>Climate: {climate}</h2>
        <h2>Population: {population}</h2>
        <button onClick={() => setShowModal(false)} />
      </div>
    </div>,
    document.getElementById('portal'),
  );
};

export default Modal;
