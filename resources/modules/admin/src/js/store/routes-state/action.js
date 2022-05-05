export const setMainMenu = (obj) => ({
  type: "SET_MENU",
  payload:  obj
})

export const setRoutes = (obj) => ({
  type: "SET_ROUTES",
  payload: obj
})
export const addRoute = (obj) => ({
  type: "ADD_ROUTE",
  payload: obj
})

export const editModels = (options) => ({
  type: "UPDATE_MODELS",
  payload: options
})
