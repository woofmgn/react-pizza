import React from "react";

type CategoriesProps = {
  categoryId: number;
  onClickCategory: any;
};

const Categories: React.FC<CategoriesProps> = ({ categoryId, onClickCategory }) => {
  const categories = [
    "Все",
    "Мясные",
    "Вегитарианские",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li
            className={categoryId === i ? "active" : ""}
            onClick={() => onClickCategory(i)}
            key={i}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
