export const CHANGE_CURRENT_TITLE = 'CHANGE_CURRENT_TITLE';

export function changeCurrentTitle(title) {
  return {
    type: CHANGE_CURRENT_TITLE,
    title
  };
}

