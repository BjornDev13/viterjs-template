import React from 'react'
import ListBody from './ListBody'
import { Box } from '@mui/material'
import Filters from './Filters'
import { useForm } from "react-hook-form"
import { useApiCalendar } from '@/hooks/useApiCalendar'
import { useEffect } from 'react'
import { useState } from 'react'

interface Inputs {
  calendarId?: string;
  timeMax?: Date | null;
  timeMin?: Date | null;
  q?: string;
  showDeleted?: boolean;
  orderBy?: string;
  maxResults?: number;
  pageToken?: string
}

export default function ListEvents() {
  
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    mode: 'all',
    defaultValues: {
      calendarId: '',
      timeMax: null,
      timeMin: null,
      showDeleted: false,
      orderBy: 'updated',
      maxResults: 10,
      q: '',
      pageToken: ''
    }
  })

  const setDefaultCalendarId = (calendarId) => { 
    setValue('calendarId', calendarId)
  }

  const { eventsList, colors, calendars, calendaColorHas, setCalendaColorHas, setfilters } = useApiCalendar({ loadEvents: true, callBack: setDefaultCalendarId })


  const submit = (data: Inputs) => {
    const newData = {
      ...data,
      ...(data.orderBy === 'startTime' ? { orderBy: 'startTime', singleEvents: true } : { orderBy: 'updated' }),
      ...(data.timeMin && { timeMin: data.timeMin.toISOString() }),
      ...(data.timeMax && { timeMax: data.timeMax.toISOString() })
    }
    setfilters(data)
  }

  const setCalendarColor = (calendarId: string) => {
    const calendarColorId = calendars.find((calendar: any) => calendar.value === calendarId)
    setCalendaColorHas(calendarColorId.colorId)
  }

  return (
    <Box
        sx={{
            minWidth: '300px',
            maxWidth: '100%',
        }}
    >
        <form onSubmit={handleSubmit(submit)}>
            <Filters control={control} calendars={calendars} setCalendarSelected={setCalendarColor} setfilters={setfilters} />
        </form>
        <ListBody data={eventsList} color={calendaColorHas} />
    </Box>
  )
}
