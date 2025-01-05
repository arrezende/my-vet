'use client'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

type CalendarEvent = {
  title: string
  date: string
}
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

export default function Calendar(events: CalendarEvent[]) {
  const handleDateClick = (arg) => {
    console.log(arg.event._def.title)
  }
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      weekends={false}
      events={events}
      eventClick={handleDateClick}
      eventContent={renderEventContent}
    />
  )
}
