import mutate from "dot-prop-immutable";
import { useSelector, useDispatch } from "react-redux";
import { changeSettings } from "../store/sections/actions";

const useGlobalSettings = (property, defaultValue) => {
  const dispatch = useDispatch();
  // Получаем настройки
  const globalSettings = useSelector((state) => state.sections.present.settings);

  let settings = {};
  // Если указано конкретное свойство, возвращаем только его
  if (property) {
    settings = mutate.get(globalSettings, property) || defaultValue;
  } else {
    settings = globalSettings;
  }

  // Записываем новые настройки
  const setSettings = (params) => {
    if (property) {
      const newSettings = mutate.set(globalSettings, property, params);
      dispatch(changeSettings(newSettings));
    } else {
      dispatch(changeSettings(params));
    }
  };

  /* useEffect(() => {
    console.log("globalSettings", globalSettings);
    document.body.style.fontFamily = globalSettings.fontFamily;
  }, [globalSettings]); */

  return [settings, setSettings];
};

export default useGlobalSettings;
