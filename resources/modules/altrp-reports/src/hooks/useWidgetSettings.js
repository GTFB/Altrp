import mutate from "dot-prop-immutable";
import { useSelector, useDispatch } from "react-redux";
import { changeWidget } from "../store/sections/actions";
import { isNumber } from "../helpers/number";

const useWidgetSettings = (property, defaultValue) => {
  const dispatch = useDispatch();
  // Получаем секции
  const sections = useSelector(({ sections }) => sections.present.sections);

  // Получаем позицию выбранного виджета в массиве
  const { sectionIndex, columnIndex, rowIndex } = useSelector(
    ({ sections }) => sections.present.selectedWidget
  );

  // Если виджет не выбран то выводим undefined
  if (!isNumber(sectionIndex)) return [{}, () => {}];

  // Получаем данные виджета
  const widget = sections[sectionIndex].columns[columnIndex][rowIndex];

  let settings = {};

  // Если указано конкретное свойство, возвращаем только его
  if (widget && property) {
    //console.log("widget.params", widget.params);
    settings = mutate.get(widget.params, property) || defaultValue;
  } else if (widget) {
    settings = widget.params;
  }

  // Записываем новые настройки
  const setSettings = (params) => {
    if (property) {
      const newSettings = mutate.set(widget.params, property, params);
      dispatch(changeWidget(newSettings));
    } else {
      dispatch(changeWidget(params));
    }
  };

  return [settings, setSettings];
};

export default useWidgetSettings;
