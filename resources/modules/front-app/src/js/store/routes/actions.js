export const CHANGE_APP_ROUTES = 'CHANGE_APP_ROUTES';

export function changeAppRoutes(routes) {
  return {
    type: CHANGE_APP_ROUTES,
    routes
  };
}

