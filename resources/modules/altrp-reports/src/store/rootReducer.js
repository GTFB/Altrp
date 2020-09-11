import { combineReducers } from "redux";
import undoable, { includeAction } from "redux-undo";
import { appReducer } from "./app/reducer";
import { sectionsReducer } from "./sections/reducer";
import {
  ADD_SECTION,
  REMOVE_COLUMNS,
  ADD_COLUMNS,
  ADD_WIDGET,
  REMOVE_WIDGET,
  IMPORT_STRUCTURE,
  REMOVE_SECTION,
} from "./types";

export const rootReducer = combineReducers({
  sections: undoable(sectionsReducer, {
    limit: 10,
    filter: includeAction([
      ADD_SECTION,
      REMOVE_COLUMNS,
      ADD_COLUMNS,
      ADD_WIDGET,
      REMOVE_WIDGET,
      REMOVE_SECTION,
      IMPORT_STRUCTURE,
    ]),
  }),
  app: appReducer,
});
