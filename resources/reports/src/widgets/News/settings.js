import React from "react";
import useWidgetSettings from "../../hooks/useWidgetSettings";
import SelectControl from "../../components/painter/controls/SelectControl";
import fakeCategories from "./fakeCategories";

const NewsSettings = () => {
  const [category, setCategory] = useWidgetSettings("category", "");

  return (
    <SelectControl
      name="Категория новостей"
      value={category}
      onChange={setCategory}
      list={fakeCategories}
    />
  );
};

export default NewsSettings;
