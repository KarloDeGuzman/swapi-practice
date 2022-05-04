import "./TableBody.css";
import { useDispatch, useSelector } from "react-redux";
import {
  updateModal,
  updatePlanetName,
  selectSortedAndFilterableCharacters,
} from "../../features/global/globalSlice";

const TableBody = ({ columns }) => {
  const dispatch = useDispatch();

  const handleModalData = (planetName) => {
    dispatch(updateModal(true));
    dispatch(updatePlanetName(planetName));
  };

  const sortableCharacters = useSelector((state) =>
    selectSortedAndFilterableCharacters(state),
  );

  return (
    <tbody>
      {sortableCharacters.map((data) => {
        return (
          <tr key={data.name}>
            {columns.map(({ field }) => {
              const tData = data[field] ? data[field] : "----";
              if (field.toUpperCase() === "HOMEWORLD") {
                return (
                  <td
                    className="td-body td-planetName"
                    key={field}
                    onClick={() => handleModalData(tData)}
                  >
                    {tData}
                  </td>
                );
              } else {
                return (
                  <td className="td-body" key={field}>
                    {tData}
                  </td>
                );
              }
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
