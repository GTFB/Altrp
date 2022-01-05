import { ADD_WIDGET } from "./actions";

const defaultState = {
    widgets: [
        
    ],
};
  
export const widgetsReduser = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_WIDGET:
            return {
                ...state, 
                widgets: [
                    ...state.widgets,
                    action.payload
                ]
            };
        default:
            return state;
    }
}
