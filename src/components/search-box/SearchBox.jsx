import React from "react";

import "./SearchBox.css";
const SearchBox = ({ onSearchHandler, className, placeholder }) => {
  return (
    <div>
      <input
        className={className}
        type="search"
        placeholder={placeholder}
        onChange={onSearchHandler}
      />
    </div>
  );
};

export default SearchBox;
