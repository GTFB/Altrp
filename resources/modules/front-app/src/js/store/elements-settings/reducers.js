import { CHANGE_SETTINGS} from "./actions";
import mutate from "dot-prop-immutable";

const defaultSettings = {};

export function elementsSettingsReducer(elementSettings, action) {
  elementSettings = elementSettings || defaultSettings;
  switch (action.type) {
    case CHANGE_SETTINGS: {
      elementSettings = mutate.set(elementSettings, action.elementId, {
        settings: action.settings,
        name: action.elementName,
      });
    }
    break;
  }
  return elementSettings;
}
