import React from "react";

type CategoriesProps = {
  categoryId: number;
  onClickCategory: (i: number) => void;
};

const categories = [
  "Все",
  "Мясные",
  "Вегитарианские",
  "Гриль",
  "Острые",
  "Закрытые",
];

const Categories: React.FC<CategoriesProps> = React.memo(({ categoryId, onClickCategory }) => {
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
})

export default Categories;
