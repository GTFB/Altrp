import mutate from "dot-prop-immutable";
import { useSelector, useDispatch } from "react-redux";
import { changeSection } from "../store/sections/actions";

const useSectionSettings = (property, defaultValue) => {
  const dispatch = useDispatch();
  // Получаем данные о секции
  const section = useSelector(
    ({ sections }) => sections.present.sections[sections.present.selectedSection]
  );
  //console.log("section", section);
  let settings = {};

  if (section && property) {
    settings = mutate.get(section.params, property) || defaultValue;
  } else if (section) {
    settings = section.params;
  }
  // Записываем новые настройки
  const setSettings = (params) => {
    if (property) {
      const newSettings = mutate.set(section.params, property, params);
      dispatch(changeSection(newSettings));
    } else {
      dispatch(changeSection(params));
    }
  };

  return [settings, setSettings];
};

export default useSectionSettings;
