import axios from "axios";
import { useEffect, useState } from "react";
import "./Categories.css";
import { useCategory } from "../../context ";

export const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [numberOfCategoriesToShow, setnumberOfCategoriesToShow] = useState(0);
  const { hotelCategory , setHotelCategory } = useCategory();

  const handleShowMoreRightClick = () => {
    setnumberOfCategoriesToShow((prev) => prev + 10);
  };

  const handleShowMoreLeftClick = () => {
    setnumberOfCategoriesToShow((prev) => prev - 10);
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://navtravel.vercel.app/api/categories/allCategories"
        );
        const categoriesToShow = data.slice(
          numberOfCategoriesToShow+10 > data.length ? data.length-10 : numberOfCategoriesToShow,
          numberOfCategoriesToShow > data.length ? data.length : numberOfCategoriesToShow+10
        );
        setCategories(categoriesToShow);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [numberOfCategoriesToShow]);

  const handleCategoryClick = (category) => {
   setHotelCategory(category);
  };
  console.log(hotelCategory);

  return (
    <section className="categories d-flex align-center gap-large cursor-pointer">
      {numberOfCategoriesToShow >= 10 && (
        <button
          className="button btn-category btn-left fixed cursor-pointer"
          onClick={handleShowMoreLeftClick}
        >
          <span class="material-icons-outlined">keyboard_arrow_left</span>
        </button>
      )}

      {categories &&
        categories.map(({ _id, category }) => {
          return <span className={`${category===hotelCategory ? "border-bottom" : ""}`} onClick={() => {
            handleCategoryClick(category)
          }} key={_id}>{category}</span>;
        })}
      {numberOfCategoriesToShow - 10 < categories.length && (
        <button
          className="button btn-category btn-right fixed cursor-pointer"
          onClick={handleShowMoreRightClick}
        >
          <span class="material-icons-outlined">keyboard_arrow_right</span>
        </button>
      )}
    </section>
  );
};
