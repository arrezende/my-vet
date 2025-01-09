import React, { useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import { ptBR } from 'date-fns/locale/pt-BR'
registerLocale('pt-BR', ptBR)

import 'react-datepicker/dist/react-datepicker.css'
import { setHours, setMinutes, setSeconds } from 'date-fns'

export default function CustomDatePicker() {
  const [startDate, setStartDate] = useState(new Date())

  return (
    <DatePicker
      className="border border-red-300 disabled:border-gray-500 rounded-md p-2 block w-full text-black"
      locale={'pt-BR'}
      showTimeSelect
      dateFormat="Pp"
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      placeholderText="dd/MM/yyyy HH:mm"
      excludeTimes={[setHours(setMinutes(new Date(), 0), 0)]}
      injectTimes={[
        setHours(setMinutes(setSeconds(new Date(), 10), 1), 0),
        setHours(setMinutes(new Date(), 5), 12),
        setHours(setMinutes(new Date(), 59), 23),
      ]}
    />
  )
}
