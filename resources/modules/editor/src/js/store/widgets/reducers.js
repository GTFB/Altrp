import { ADD_WIDGET, FILTER_WIDGETS } from "./actions"
import defaultState from "./defaultState"

const _defaultState = window.editorAPI.applyPluginsFiltersSync('default_elements_state_filter', defaultState)

export function widgetsReducer (state = _defaultState, action) {
    switch (action.type) {
        case ADD_WIDGET:
            return {
                ...state,
                elements: {
                    ...state.elements,
                    [action.payload.element.getName()]: action.payload.element
                },
                components: {
                    ...state.components,
                    [action.payload.element.getName()]: action.payload.component
                },
                allElements: {
                    ...state.allElements,
                    [action.payload.element.getName()]: action.payload.element
                },
                allComponents: {
                    ...state.allComponents,
                    [action.payload.element.getName()]: action.payload.component
                }
            }
        case FILTER_WIDGETS:

            return action.payload(state)

        default:
            return state
    }
}
