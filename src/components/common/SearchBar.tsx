import React, { useState } from "react";
import PropTypes from "prop-types";
import { SearchIcon } from "@heroicons/react/outline";

const SearchBar = ({ spacing }) => {
  const [text, setText] = useState("");

  return (
    <div className={`form-control ${spacing}`}>
      <div className="input-group bg-transparent">
        <button className="border-0 bg-transparent pl-4">
          <SearchIcon className="h-6 w-6 rotate-90" />
        </button>
        <input
          className="input w-full border-0 focus:outline-none focus:ring-0"
          placeholder="Search…"
          type="search"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  spacing: PropTypes.string
};

export default SearchBar;
