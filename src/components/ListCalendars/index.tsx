import React from 'react'
import ListBody from './ListBody'
import { Box, Button } from '@mui/material'
import Filters from './Filters'
import { useForm } from "react-hook-form"
import { useApiCalendar } from '@/hooks/useApiCalendar'
import LoadListBody from './LoadListBody'
import { useState } from 'react'
import CreateCalendar from './NewCalendar'
import ShareCalendar from './ShareCalendar'

interface Inputs {
  showHidden?: boolean;
  showDeleted?: boolean;
  maxResults?: number;
  pageToken?: string
}

export default function ListCalendars() {
  
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    mode: 'all',
    defaultValues: {
      showHidden: true,
      showDeleted: false,
      maxResults: 10,
      pageToken: ''
    }
  })


  const { isLoad, calendars, setfilters, createCalendar, colors, insertAcl } = useApiCalendar({ loadEvents: false, onlyFindCalendars: true })
  const [open, setOpen] = useState(false)
  const [openShareCalendar, setOpenShareCalendar] = useState(false)
  const [idCalendar, setIdCalendar] = useState(null)

  const submit = (data: Inputs) => {
    const newData = {
      showHidden: data.showHidden,
      maxResults: data.maxResults,
      pageToken: data.pageToken,
    }
    setfilters(newData)
  }

  const shareCalendar = (idCalndar: string) => {
    setOpenShareCalendar(true)
    setIdCalendar(idCalndar)

  }

  const shareCalendarSubmit = async (data: { email: string }) => {
    await insertAcl(idCalendar, data.email)
    setOpenShareCalendar(false)
  }


  return (
    <Box
        sx={{
            minWidth: '300px',
            maxWidth: '100%',
        }}
    >
        <form onSubmit={handleSubmit(submit)}>
            <Filters control={control} setfilters={setfilters} setOpen={setOpen} />
        </form>
        {
          isLoad ? (
            <LoadListBody />
          ) : (
            <ListBody data={calendars} setOpenShareCalendar={shareCalendar}  />
          )
        }
        <ShareCalendar open={openShareCalendar} onClose={() => setOpenShareCalendar(false)} onSubmit={shareCalendarSubmit} />
        <CreateCalendar open={open} onClose={() => setOpen(false)} onSubmit={createCalendar} colors={colors} setValue={setValue} />
    </Box>
  )
}
