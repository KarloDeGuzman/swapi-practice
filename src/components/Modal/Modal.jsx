import { useRef } from "react";
import ReactDom from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getPlanetDetails,
  updateModal,
} from "../../features/global/globalSlice";

import "./Modal.css";
const Modal = () => {
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

  const formatNumberWithCommas = (value) => {
    if (!isNaN(value)) {
      return parseInt(value).toLocaleString();
    }

    return value;
  };

  return ReactDom.createPortal(
    <div className="modal-container" ref={modalRef} onClick={closeModal}>
      <div className="modal">
        <h2>
          Planet Name: <span className="planet-text-detail">{name}</span>
        </h2>
        <h2>
          Diameter:{" "}
          <span className="planet-text-detail">
            {formatNumberWithCommas(diameter)}
          </span>
        </h2>
        <h2>
          Climate: <span className="planet-text-detail">{climate}</span>
        </h2>
        <h2>
          Population:{" "}
          <span className="planet-text-detail">
            {formatNumberWithCommas(population)}
          </span>
        </h2>
        <button
          className="modal-close-button"
          onClick={() => dispatch(updateModal(false))}
        />
      </div>
    </div>,
    document.getElementById("portal"),
  );
};

export default Modal;
