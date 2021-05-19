import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/es";
import React, { useState } from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux';
import {Calendar, momentLocalizer} from 'react-big-calendar'

import { Navbar } from '../ui/Navbar'
import { messages } from '../../helpers/messages';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';

import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from "../ui/DeleteEventFab";

moment.locale('es')
const localizer = momentLocalizer(moment) // or globalizeLocalizer
 
export const CalendarScreen = () => {

  const dispatch = useDispatch()
  
  const {events, activeEvent} = useSelector(state => state.calendar)
  
  const [lastView, setLastView] = useState(localStorage.getItem("lastView") || 'month');

    const onDoubleClick = (e)=>{
      dispatch( uiOpenModal() )
    }

    const onSelectEvent = (e) => {
      dispatch( eventSetActive(e) )
     
    };

    const onViewChange = (e) =>{
      setLastView(e)
      localStorage.setItem('lastView', e)
    }

    const onSelectSlot = (e) => {
      // console.log(e)
      dispatch( eventClearActiveEvent() ) 
      // TODO: deberia click para crear un evento
      // dispatch( uiOpenModal(e) )
    }
    
    const eventPropGetter = ( event, start, end, isSelected ) =>{
      const style ={
        backgroundColor: '#5189af',
        borderRadius: '0px',
        opacity: 0.8,
        display: 'block',
        color: 'white'
      }

      return {
        style
      }
    };


  
    return (
      <div className="calendar-screen">
        <Navbar />
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          messages={messages}
          eventPropGetter={eventPropGetter}
          onDoubleClickEvent={onDoubleClick}
          onSelectEvent={onSelectEvent}
          onView={onViewChange}
          onSelectSlot={onSelectSlot}
          selectable={true}
          view={lastView}
          components={{
            event: CalendarEvent,
          }}
        />

        <AddNewFab />
        { (activeEvent ) &&
          <DeleteEventFab />
        }
        <CalendarModal />
      </div>
    );
}
