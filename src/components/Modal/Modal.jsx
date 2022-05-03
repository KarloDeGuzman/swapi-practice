import { useRef } from "react";
import ReactDom from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getPlanetDetails,
  updateModal,
} from "../../features/global/globalSlice";

import "./Modal.css";
const Modal = ({ singlePlanetData }) => {
  const dispatch = useDispatch();

  const planetDetails = useSelector((state) => getPlanetDetails(state));

  // close the modal when clicking outside the modal
  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      dispatch(updateModal(false));
    }
  };

  const { name, diameter, climate, population } = planetDetails[0];

  return ReactDom.createPortal(
    <div className="modal-container" ref={modalRef} onClick={closeModal}>
      <div className="modal">
        <h2>Planet Name: {name}</h2>
        <h2>Diameter: {diameter}</h2>
        <h2>Climate: {climate}</h2>
        <h2>Population: {population}</h2>
        <button onClick={() => dispatch(updateModal(false))} />
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default Modal;
