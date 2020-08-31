export const CHANGE_CURRENT_MODEL = 'CHANGE_CURRENT_MODEL';

export function changeAppRoutes(model) {
  return {
    type: CHANGE_CURRENT_MODEL,
    model
  };
}

