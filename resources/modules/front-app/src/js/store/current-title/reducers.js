import { CHANGE_CURRENT_TITLE } from "./actions";
if (typeof document === "undefined") {
  global.document = {};
}

const defaultTitle = document?.title || "";

export function currentTitleReducer(title, action) {
  title = title || defaultTitle;
  switch (action.type) {
    case CHANGE_CURRENT_TITLE:
      {
        title = action.title;
      }
      break;
  }
  return title;
}
