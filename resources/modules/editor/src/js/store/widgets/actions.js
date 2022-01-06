export const ADD_WIDGET = 'ADD_WIDGET'
export const FILTER_WIDGETS = 'FILTER_WIDGETS'

export const addWidget = payload => ({
    type: ADD_WIDGET,
    payload
})

export const filterWidgets = payload => ({
    type: FILTER_WIDGETS,
    payload
})