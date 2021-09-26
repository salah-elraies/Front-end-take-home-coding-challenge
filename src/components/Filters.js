import { Clear, ExpandMore } from "@material-ui/icons";
import { useEffect, useState } from "react";
import "./Filters.css";
import rate from "../rate.svg";
function Filters({
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
  color,
  setAverageRating,
  orderByDate,
  setOrderByDate,
  setColorFilter,
}) {
  const [filterShow, setFilterShow] = useState(false);
  const [colorSearch, setColorSearch] = useState("");
  const [colorCheck, setColorCheck] = useState();
  const [selectedStars, setSelectedStars] = useState("");
  const showFilters = () => {
    setFilterShow(!filterShow);
  };
  const clearPriceRange = () => {
    setPriceMin(1);
    setPriceMax(9999999);
  };
  return (
    <div className="filters">
      <div onClick={showFilters} className="filterToggle">
        <span>Filter By</span>
        <ExpandMore />
      </div>
      <div className={`filters_content ${filterShow ? "showFilter" : ""}`}>
        <div className="filter_group">
          <h3>Price Range</h3>
          <div className="priceRange">
            <input
              onChange={(e) => setPriceMin(e.target.value)}
              value={priceMin}
              name="min"
              id="min"
              type="number"
            />
            <input
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
              name="max"
              id="max"
              type="number"
            />
          </div>
          <button onClick={clearPriceRange} className="clear">
            <Clear />
          </button>
        </div>
        <div className="filter_group">
          <h3>Color</h3>
          <input onChange={(e) => setColorSearch(e.target.value)} type="text" />
          <div className="colors">
            {color
              .filter((val) => {
                if (colorSearch === "") {
                  return val;
                } else if (
                  val?.toLowerCase().includes(colorSearch.toLowerCase())
                ) {
                  return val;
                }
                return false;
              })
              .map((item) => (
                <div key={item} className="color">
                  <input
                    onChange={(e) => {
                      setColorFilter((curr) => {
                        if (!e.target.checked) {
                          return curr.filter((clr) => clr !== e.target.value);
                        } else {
                          if (curr !== []) {
                            return [...curr, e.target.value];
                          } else {
                            return [e.target.value];
                          }
                        }
                      });
                    }}
                    style={{ accentColor: `${item}` }}
                    value={item}
                    checked={colorCheck}
                    type="checkbox"
                    name={item}
                    id={item}
                  />
                  <label
                    style={{
                      color: `${item.replace(" ", "")}`,
                      textShadow: "0 0 3px #000",
                    }}
                    htmlFor={item}
                  >
                    {item}
                  </label>
                </div>
              ))}
          </div>
          <button
            onClick={() => {
              setColorCheck(false);
              setColorFilter([]);
              setTimeout(() => setColorCheck(), 300);
            }}
            className="clear"
          >
            <Clear />
          </button>
        </div>
        <div className={`filter_group stars`}>
          <h3>Average Rating</h3>
          <div
            onClick={() => {
              setAverageRating(5);
              setSelectedStars("five");
            }}
            className={`product_rating rateFilter ${
              selectedStars === "five" ? "five" : ""
            }`}
          >
            {Array(5)
              .fill()
              .map((_, i) => {
                return <img key={i} src={rate} alt="rate" />;
              })}
          </div>
          <div
            onClick={() => {
              setAverageRating(4);
              setSelectedStars("four");
            }}
            className={`product_rating rateFilter ${
              selectedStars === "four" ? "four" : ""
            }`}
          >
            {Array(4)
              .fill()
              .map((_, i) => {
                return <img key={i} src={rate} alt="rate" />;
              })}
          </div>
          <div
            onClick={() => {
              setAverageRating(3);
              setSelectedStars("three");
            }}
            className={`product_rating rateFilter ${
              selectedStars === "three" ? "three" : ""
            }`}
          >
            {Array(3)
              .fill()
              .map((_, i) => {
                return <img key={i} src={rate} alt="rate" />;
              })}
          </div>
          <div
            onClick={() => {
              setAverageRating(2);
              setSelectedStars("two");
            }}
            className={`product_rating rateFilter ${
              selectedStars === "two" ? "two" : ""
            }`}
          >
            {Array(2)
              .fill()
              .map((_, i) => {
                return <img key={i} src={rate} alt="rate" />;
              })}
          </div>
          <div
            onClick={() => {
              setAverageRating(1);
              setSelectedStars("one");
            }}
            className={`product_rating rateFilter ${
              selectedStars === "one" ? "one" : ""
            }`}
          >
            {Array(1)
              .fill()
              .map((_, i) => {
                return <img key={i} src={rate} alt="rate" />;
              })}
          </div>
          <button onClick={() => setAverageRating(0)} className="clear">
            <Clear />
          </button>
        </div>
        <div className="sort_group">
          <input
            onChange={() => setOrderByDate(!orderByDate)}
            type="checkbox"
          />
          <h3>Sort by Date Posted</h3>
        </div>
      </div>
    </div>
  );
}

export default Filters;
