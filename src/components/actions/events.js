import { types } from "../type/types";


export const eventAddNew = (event) =>({
    type: types.eventAddNew,
    payload: event
})


export const eventSetActive = (event) =>({
    type: types.eventSetActive,
    payload: event
})

export const eventClearActiveEvent = (event) =>({
    type: types.eventClearActiveEvent
})

export const eventUpdated = (event) =>({
    type: types.eventUpdate,
    payload: event
})