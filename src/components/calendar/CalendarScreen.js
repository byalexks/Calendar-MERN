import React, { useState } from 'react'
import moment from 'moment'
import {Calendar, momentLocalizer} from 'react-big-calendar'

import { Navbar } from '../ui/Navbar'
import { messages } from '../../helpers/messages';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';

import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/es";

moment.locale('es')
const localizer = momentLocalizer(moment) // or globalizeLocalizer
 
const events = [
    {
      title: "Cumpleaños mio",
      start: moment().toDate(),
      end: moment().add(2, "hours").toDate(),
      bgcolor: '#fafafa',
      notes: 'compra el pastel',
      user:{
        _id: '123',
        name:'Alexis'
      }
    },
  ];

export const CalendarScreen = () => {

  const [lastView, setLastView] = useState(localStorage.getItem("lastView") || 'month');

    const onDoubleClick = (e)=>{
      console.log(e);
    }

    const onSelectEvent = (e) => {
      console.log(e);
    };

    const onViewChange = (e) =>{
      setLastView(e)
      localStorage.setItem('lastView', e)
    }
    

    const eventPropGetter = ( event, start, end, isSelected ) =>{
      const style ={
        backgroundColor: '#A2CF07',
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
          view={lastView}
          components={{
            event: CalendarEvent,
          }}
        />

        
        <CalendarModal />
      </div>
    );
}
