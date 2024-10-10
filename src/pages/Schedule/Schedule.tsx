import PageContainer from '@/components/DashboardLayout/components/AdminContainer/PageContainer';
import { Container } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { A } from 'vitest/dist/reporters-yx5ZTtEV';
import StepOne from './steps/StepOne';
import { CheckAvailabilityResponse, useApiCalendar } from '@/hooks/useApiCalendar';
import { useEffect } from 'react';
import { getValue } from '@mui/system';
import StepTwo from './steps/StepTwo';

type AttendeesType = {
    email: string;
    displayName: string;
    responseStatus: string;
    // responseStatus = Estado de respuesta del asistente. Los valores posibles son:
    // “needsAction” - El asistente no ha respondido a la invitación (recomendado para nuevos eventos).
    // “declined” - El asistente rechazó la invitación.
    // “tentative” - El asistente aceptó la invitación de manera provisoria.
    // “accepted” - El asistente aceptó la invitación.
}

type EndTime = {
    dateTime?: Date;
    timeZone: string; //'America/Caracas'   
}

type StarTime = {
    dateTime?: Date;
    timeZone: string; //'America/Caracas'
}
interface Inputs {
    calendarId: string;
    summary: string;
    text: string;
    sendUpdates: boolean;
    start: Date;
    end: Date;
    anyoneCanAddSelf: boolean;
    attendees: AttendeesType[];
    colorId: string;
    description: string;
    eventType: string;
    location: string;
    status: string;
  }

export default function Schedule() {
    const [step, setStep] = useState(1)
    const [notAvailableDays, setNotAvailableDays] = useState(null)
    const { checkAvailability, calendars, insertEvent, colors, isLoad } = useApiCalendar({ loadEvents: false })
    const {
        control,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
      } = useForm<Inputs>({
        mode: 'all',
        defaultValues: {
            calendarId: '',
            summary: '',
            text: '',
            sendUpdates: true,
            start: new Date(new Date().setHours(0, 0, 0, 0)),
            end: new Date(new Date().setHours(23, 59, 59, 999)),
            anyoneCanAddSelf: false,
            attendees: [],
            location: '',
            colorId: '',
            description: '',
            eventType: 'default',
            status: 'tentative',
        }
      })

      const getAvailability = async ({ calendarId, timeMax, timeMin }) => {
          try {
              const data: CheckAvailabilityResponse[] = await checkAvailability({ calendarId, timeMax, timeMin });
              if (data) {
                  const adjustedData = data.map(item => ({
                      ...item,
                      start: new Date(item.start).toLocaleString('en-US', { timeZone: 'America/Caracas' }),
                      end: new Date(item.end).toLocaleString('en-US', { timeZone: 'America/Caracas' })
                  }));
                  setNotAvailableDays(adjustedData);
              } else {
                  console.error('No data returned from checkAvailability');
              }
          } catch (error) {
              console.error('Error fetching availability:', error);
          }
      }

      const renderStep = (step: number) => {
        switch (step) {
            case 1:
                return <StepOne changeStepAndSetTime={changeStepAndSetTime} notAvailableDays={notAvailableDays} getValues={getValues} getAvailability={getAvailability} calendars={calendars} control={control} />
            case 2:
                return (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <StepTwo isLoad={isLoad} colors={colors} setValues={setValue} control={control} getValues={getValues} setStep={setStep} />
                    </form>
                )
            default:
                return <StepOne changeStepAndSetTime={changeStepAndSetTime} notAvailableDays={notAvailableDays} getValues={getValues} getAvailability={getAvailability} calendars={calendars} control={control} />
        }
      }

      const changeStepAndSetTime = ({ date, time }: { date: Date, time: string }) => {
        const [hours, minutes] = time.split(/[: ]/);
        const period = time.split(' ')[1];
        let adjustedHours = parseInt(hours);

        if (period === 'PM' && adjustedHours < 12) {
            adjustedHours += 12;
        } else if (period === 'AM' && adjustedHours === 12) {
            adjustedHours = 0;
        }

        const adjustedDate = new Date(date);
        adjustedDate.setHours(adjustedHours, parseInt(minutes), 0, 0);
        setValue('start', adjustedDate);
        
        const endDate = new Date(adjustedDate);
        endDate.setMinutes(endDate.getMinutes() + 30);
        setValue('end', endDate);

        setStep(2);
      }

    const onSubmit = async (data: Inputs) => {
    //   e.preventDefault();
    const newData = {
        calendarId: data.calendarId,
        resource: {
            summary: data.summary,
            sendUpdates: data.sendUpdates,
            anyoneCanAddSelf: data.anyoneCanAddSelf,
            attendees: data.attendees,
            colorId: data.colorId,
            description: data.description,
            eventType: data.eventType,
            status: data.status,
            start: {
                dateTime: data.start.toISOString(),
                timeZone: 'America/Caracas'
            },
            end: {
                dateTime: data.end.toISOString(),
                timeZone: 'America/Caracas'
            }
        }
    }
    await insertEvent(newData);
    }


  return (
    <PageContainer title="schedule" description="crear nuevo evento">
        <Container sx={{ py: 2, position: 'relative' }}>
            { renderStep(step) }
        </Container>
    </PageContainer>
  )
}
