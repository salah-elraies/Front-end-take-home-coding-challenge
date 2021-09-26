// premium plugins
import React, { useEffect, useState } from "react";
// css file
import "./Home.css";
import Product from "../components/Product";
import { useStateValue } from "../StateProvider";
import AddedSuccessfully from "../components/AddedSuccessfully";
import axios from "../axios";
import Filters from "../components/Filters";
//

function Home() {
  document.title = "Assignment by salah elraies";
  const [{ basket, searchTerm }] = useStateValue();
  const [categories, setCategories] = useState([]);
  const [products, setPrdcts] = useState([]);
  const [categoryID, setCategoryID] = useState("1");
  const [categoryName, setCategoryName] = useState([{ name: "Books" }]);
  // filter states
  const [priceMin, setPriceMin] = useState(1);
  const [priceMax, setPriceMax] = useState(9999999);
  const [color, setColor] = useState([]);
  const [colorFilter, setColorFilter] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [orderByDate, setOrderByDate] = useState(false);
  // fetch categoreis
  useEffect(() => {
    axios.get(`/category`).then((resp) => setCategories(resp.data));
  }, []);
  // fetch products by category
  useEffect(() => {
    axios
      .get(`/product/?categoryId=${categoryID}`)
      .then((resp) => setPrdcts(resp.data));
    // console.log(color);
  }, [categoryID]);
  useEffect(() => {
    let colorArr = [...products];
    let filteredColorArr = [];
    let colorArrSort = colorArr
      ?.map((prod) => prod.color)
      .sort((a, b) => a.localeCompare(b));
    filteredColorArr.push(colorArrSort[0]);
    for (let i = 0; i < colorArrSort.length; i++) {
      if (i !== 0 && colorArrSort[i] !== colorArrSort[i - 1]) {
        filteredColorArr.push(colorArrSort[i]);
      }
    }
    setColor(filteredColorArr);
  }, [products]);
  // >>>>>>>>>>>>>
  const fetchCategory = (id) => {
    setCategoryID(id);
    let cateName = [...categories];
    setCategoryName(cateName.filter((val) => val.id === id));
  };
  // console.log(new Date(val.releaseDate));
  // console.log(filteredColorArr, "final");
  return (
    <div className="home">
      <div className="home_container">
        {basket && <AddedSuccessfully />}
        <div className="categories">
          {categories.map((category) => {
            return (
              <div
                key={category.id}
                onClick={() => fetchCategory(category.id)}
                className={`category ${
                  categoryName[0]?.name === category.name ? "selected" : ""
                }`}
                style={{
                  backgroundImage: `url(${category.image}${category.id})`,
                }}
              >
                {category.name}
              </div>
            );
          })}
        </div>
        <Filters
          priceMin={priceMin}
          setPriceMin={setPriceMin}
          priceMax={priceMax}
          setPriceMax={setPriceMax}
          color={color}
          setColor={setColor}
          setAverageRating={setAverageRating}
          orderByDate={orderByDate}
          setOrderByDate={setOrderByDate}
          colorFilter={colorFilter}
          setColorFilter={setColorFilter}
        />
        {products.length > 0 ? (
          <>
            <h3 className="selectedCategory">{categoryName[0]?.name}</h3>
            <div className="products">
              {products
                .filter((val) => {
                  if (searchTerm === "") {
                    return val;
                  } else if (
                    val.name.toLowerCase().includes(searchTerm.toLowerCase())
                  ) {
                    return val;
                  }
                  return false;
                })
                .filter((val) => {
                  if (averageRating === 0) {
                    return val;
                  } else if (val.rating === averageRating) {
                    return val;
                  }
                  return false;
                })
                .filter((val) => {
                  if (priceMin === 0) {
                    return val;
                  } else if (val.price >= priceMin) {
                    return val;
                  }
                  return false;
                })
                .filter((val) => {
                  if (priceMax === 9999999) {
                    return val;
                  } else if (val.price <= priceMax) {
                    return val;
                  }
                  return false;
                })
                .filter((val) => {
                  if (colorFilter.length === 0) {
                    return val;
                  } else if (colorFilter.find((clr) => clr === val.color)) {
                    return val;
                  }
                  return false;
                })
                .sort(
                  (a, b) =>
                    orderByDate &&
                    new Date(a.releaseDate) - new Date(b.releaseDate)
                )
                .map((product) => (
                  <Product
                    key={product.id}
                    name={product.name}
                    image={`${product.image}${product.id}`}
                    color={product.color}
                    price={product.price}
                    releaseDate={product.releaseDate}
                    categoryId={product.categoryId}
                    rating={product.rating}
                  />
                ))}
            </div>
          </>
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </div>
  );
}

export default Home;
