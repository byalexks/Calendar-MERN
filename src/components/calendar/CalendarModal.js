import React, { useEffect, useState } from "react";
import moment from 'moment'
import Swal from 'sweetalert2'
import DateTimePicker from "react-datetime-picker";
import Modal from "react-modal";

import { useDispatch, useSelector } from "react-redux";
import { uiCloseModal } from "../../actions/ui";
import { eventClearActiveEvent, eventStartUpdated, startAddNew } from "../../actions/events";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1,'hours');
const endDate = now.clone().add(1,'hours')

const initEvent = {
  title: '',
  notes: '',
  start: now.toDate(),
  end: endDate.toDate(),
}

export const CalendarModal = () => {

  const {modalOpen} = useSelector(state => state.ui)
  const {activeEvent} = useSelector(state => state.calendar)
  const dispatch = useDispatch()


  const [dateStart, setDateStart] = useState( now.toDate() )
  const [dateEnd, setDateEnd] = useState( endDate.toDate() )
  const [titleValid, setTitleValid] = useState(true)

  const [formValues, setFormValues] = useState(initEvent)
  
  const {notes, title, start, end} = formValues;

  useEffect(() => {
    if (activeEvent) {
      setFormValues( activeEvent )      
    }else {
      setFormValues( initEvent )
    }

  }, [activeEvent])

  const handleInputChange = ({target}) =>{
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  }
  
  const closeModal = () => {
    // TODO: cerrar modal
    dispatch( uiCloseModal() )
    dispatch( eventClearActiveEvent())
    setFormValues(initEvent)
    
  };
  
  const handleStartDateChange = (e)=>{
    setDateStart(e)
    setFormValues({
      ...formValues,
      start: e
    })

  }

  const handleEndDateChange = (e) => {
    setDateEnd(e)
    setFormValues({
      ...formValues,
      end: e
    })
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    
    const momentStart = moment(start);
    const momentEnd = moment(end);


    if (momentStart.isSameOrAfter(momentEnd)){
      Swal.fire('Error','la fecha fin debe ser mayor a la fecha de inicio', 'error')
      return
    }

    if (title.trim().length < 2) {
      return setTitleValid(false);
    }

    // TODO: realizar grabacion db
    if (activeEvent) {
      dispatch( eventStartUpdated(formValues) )
    }else{
      dispatch( startAddNew(formValues) )
  }

    setTitleValid(true);
    closeModal();


  }
  
  return (
    <Modal
      isOpen={modalOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-fondo"
    >
      <h1> { (activeEvent) ? 'Editar evento' : 'Nuevo evento'} </h1>
      <hr />
      <form 
        className="container"
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label>Fecha y hora inicio</label>
              <DateTimePicker
                onChange={ handleStartDateChange }
                value={ dateStart }
                className="form-control"
              />
        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <DateTimePicker
                onChange={ handleEndDateChange }
                value={ dateEnd }
                minDate={dateStart}
                className="form-control"
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${!titleValid && 'is-invalid'}`} 
            placeholder="T??tulo del evento"
            name="title"
            value={title}
            onChange={handleInputChange}
            autoComplete="off"
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripci??n corta
          </small>
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={ notes }
            onChange={ handleInputChange }
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Informaci??n adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
