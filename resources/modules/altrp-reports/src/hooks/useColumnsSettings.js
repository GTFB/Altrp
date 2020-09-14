import mutate from "dot-prop-immutable";
import { useSelector, useDispatch } from "react-redux";
import { changeSection, addColumns, removeColumns } from "../store/sections/actions";

const useColumnsSettings = (property, defaultValue) => {
  const dispatch = useDispatch();
  // Получаем данные о секции
  const section = useSelector(
    ({ sections }) => sections.present.sections[sections.present.selectedSection]
  );

  // Записываем новые настройки
  const setSettings = (params) => {
    if (property) {
      const newSettings = mutate.set(section.params, property, params);
      dispatch(changeSection(newSettings));
    } else {
      dispatch(changeSection(params));
    }

    if (property === "columns") {
      const currentCountColumns = section.columns.length;
      const newCountColumns = +params;

      // Считаем разницу между текущим количеством колонок и новым
      const diff = newCountColumns - currentCountColumns;

      if (currentCountColumns > newCountColumns) {
        // Если текущее количество больше нового, то удаляем лишние колонки
        dispatch(removeColumns(diff));
      } else {
        // Если текущее количество меньше, то добавляем
        dispatch(addColumns(diff));
      }
    }
  };

  let settings = {};

  // Если указано конкретное свойство, возвращаем только его
  if (section && property) {
    settings = mutate.get(section.params, property) || defaultValue;
  } else if (section) {
    settings = section.params;
  }

  return [settings, setSettings];
};

export default useColumnsSettings;
