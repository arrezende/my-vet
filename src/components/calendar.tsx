'use client'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

type CalendarEvent = {
  title: string
  date: string
  hour: string
}

export default function Calendar(events: CalendarEvent[]) {
  const [isOpen, setIsOpen] = useState(false)
  const [eventSelected, setEventSelected] = useState({
    title: '',
    date: '',
  })
  const router = useRouter()

  const handleDateClick = (arg: { dateStr: string }) => {
    router.push(`/consulta/create/${arg.dateStr}`)
  }
  const handleEventClick = (arg: { event: { title: string } }) => {
    setIsOpen(!isOpen)
    console.log(arg.event)
    setEventSelected({
      title: arg.event.title.split('|')[0],
      date: arg.event.title.split('|')[1],
    })
  }

  function eventContent(props: { event: { title: string } }) {
    const title = props.event.title.split('|')[0]
    const hour = props.event.title.split('|')[1]
    console.log(title)
    return (
      <ul className="bg-green-300 p-3 text-green-900">
        <li>
          <b>Nome:</b> {title}
        </li>
        <li>
          <b>Hora agendada:</b> {hour}
        </li>
      </ul>
    )
  }
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale={'pt-br'}
        eventClick={handleEventClick}
        weekends={true}
        events={events}
        eventColor="transparent"
        eventTextColor="white"
        dateClick={handleDateClick}
        eventContent={eventContent}
      />
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Detalhes da Consulta</DialogTitle>
            <DialogDescription>
              <ul>
                <li>
                  nome do animal: <strong>{eventSelected.title}</strong>
                </li>
                <li>
                  Hora da consulta: <strong>{eventSelected.date}</strong>
                </li>
                <li>
                  Médico Responsável:<strong>Médico 1</strong>
                </li>
              </ul>
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Fechar
              </Button>
            </DialogClose>
            <Button type="button">Alterar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
