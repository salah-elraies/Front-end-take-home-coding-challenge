// premium plugins
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
// css file
import "./Header.css";
// icons
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import { useStateValue } from "../StateProvider";

function Header() {
  const history = useHistory();
  const [search, setSearch] = useState("");
  const [{ basket }, dispatch] = useStateValue();
  const [navMobile, setNavMobile] = useState(false);
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch({
      type: "SEARCH_TERM",
      searchTerm: search,
    });
    history.push("/");
  };
  return (
    <div className="header">
      <div
        onClick={() => setNavMobile(!navMobile)}
        className={`largeScreen menuBtn ${navMobile && "lol"}`}
      >
        <span className="brgr"></span>
      </div>
      <Link to="/">
        <h1 className="header_logo">Assignment</h1>
      </Link>
      <div
        className={`media-controller mobileHide ${
          navMobile && "header_mobile"
        }`}
      >
        <form className="header_search" onSubmit={handleSearch}>
          <input
            type="text"
            name="search"
            className="header_searchInput"
            placeholder="Search Selected Category"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="header_searchBtn">
            <SearchIcon className="header_searchIcon" />
          </button>
        </form>
        <div className="header_liBasket">
          <ShoppingCartIcon />
          <span className="header_liLower header_basketCount">
            {basket?.length}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Header;
