import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/stringToDate";
import { types } from "../type/types";

export const startAddNew = (event) => {
  return async (dispatch, getState) => {
    const { uid, name } = getState().auth;
    try {
      const resp = await fetchConToken("event", event, "POST");
      const body = await resp.json();

      if (body.ok) {
        event.id = body.evento.id;
        event.user = {
          _id: uid,
          name,
        };
        Swal.fire("Guardado", "El evento se guardo correctamente", "success");
        dispatch(eventAddNew(event));
      }
    } catch (error) {
      Swal.fire("Error", "no se pudo guardar el evento", "error");
      console.log(error);
    }
  };
};

const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event,
});

export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event,
});

export const eventClearActiveEvent = (event) => ({
  type: types.eventClearActiveEvent,
});

export const eventStartUpdated = (event) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken(`event/${event.id}`, event, "PUT");
      const body = await resp.json();

      if (body.ok) {
        dispatch(eventUpdated(event));
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const eventUpdated = (event) => ({
  type: types.eventUpdate,
  payload: event,
});

export const eventDeleted = (event) => ({
  type: types.eventDeleted,
});

export const eventStartLoading = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken("event");
      const body = await resp.json();
      const events = prepareEvents(body.eventos);

      if (body.ok) {
        dispatch(eventLoaded(events));
      } else {
        Swal.fire("Error", "No se pudo cargar los eventos", "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
const eventLoaded = (event) => ({
  type: types.eventLoaded,
  payload: event,
});
