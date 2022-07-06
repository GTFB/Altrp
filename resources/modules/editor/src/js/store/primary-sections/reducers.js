import { SET_SECTIONS,  } from "./actions"
import defaultState from "./defaultState"

export function primarySectionsReducer (state = defaultState, action) {
    switch (action.type) {
      case SET_SECTIONS:
            return [
              ...action.payload
            ]

        default:
            return state
    }
}
