import { ADD_WIDGET, FILTER_WIDGETS } from "./actions"
import defaultState from "./defaultState"

export function widgetsReducer (state = defaultState, action) {
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
