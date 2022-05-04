import { useDispatch } from "react-redux";
import { updateSearchField } from "../../features/global/globalSlice";
import "./SearchBox.css";

const SearchBox = () => {
  const dispatch = useDispatch();

  const onSearchChangeHandler = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    dispatch(updateSearchField(searchFieldString));
  };

  return (
    <div>
      <input
        className="character-search-box"
        placeholder="search characters"
        type="search"
        onChange={onSearchChangeHandler}
      />
    </div>
  );
};

export default SearchBox;
