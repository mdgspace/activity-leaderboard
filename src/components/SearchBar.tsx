import React from "react";
import "../styles/searchBar.scss";
const SearchBar = () => {
  return (
    <div className="search-container">
      <input className="search-input" type="text" placeholder="Search" />
    </div>
  );
};

export default SearchBar;
