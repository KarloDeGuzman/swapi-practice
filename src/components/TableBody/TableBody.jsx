import "./TableBody.css";
import { useDispatch } from "react-redux";
import {
  updateModal,
  updatePlanetName,
} from "../../features/global/globalSlice";

const TableBody = ({ columns, tableData }) => {
  const dispatch = useDispatch();

  const handleModalData = (planetName) => {
    dispatch(updateModal(true));
    dispatch(updatePlanetName(planetName));
  };

  return (
    <tbody>
      {tableData.map((data) => {
        return (
          <tr key={data.name}>
            {columns.map(({ field }) => {
              const tData = data[field] ? data[field] : "----";
              if (field.toUpperCase() === "HOMEWORLD") {
                return (
                  <td
                    className="td-body"
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
