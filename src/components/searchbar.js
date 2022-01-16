import React, { useState } from "react";
import logo from "../resources/images/logo2.png";
import { FaMicrophone } from "react-icons/fa";
import { FaEllipsisV } from "react-icons/fa";
import { FaTh } from "react-icons/fa";
import { FaStream } from "react-icons/fa";
import { useHistory } from "react-router";

const Searchbar = () => {
  const [query, setQuery] = useState("");
  const history = useHistory();

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    history.push(`/results/?q=${query}`);
  };

  return (
    <div>
      <nav className="navbar navbar-light header">
        <FaStream style={{ width: "50px", height: "20px" }} />

        <a className="navbar-brand" href="/">
          <img src={logo} width="100" height="30" alt="" />
        </a>

        <form
          className="form-inline my-2 my-lg-0 search-form"
          onSubmit={handleSearch}
        >
          <input
            className="form-control mr-sm-2 search-input"
            type="search"
            placeholder="Search"
            value={query}
            onChange={handleInputChange}
          />
          <button className="btn btn-outline-danger my-2 my-sm-0">
            Search
          </button>
        </form>
        <div>
          <FaMicrophone style={{ width: "50px", height: "20px" }} />
          <FaTh style={{ width: "50px", height: "20px" }} />
          <FaEllipsisV style={{ width: "50px", height: "20px" }} />
        </div>

        <button className="btn btn-outline-danger my-2 my-sm-0">Sign In</button>
      </nav>
    </div>
  );
};

export default Searchbar;
