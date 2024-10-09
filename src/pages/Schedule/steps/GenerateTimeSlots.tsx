import { useMemo } from 'react';
import { Box, MenuItem, Paper, TextField } from '@mui/material';
import { CheckAvailabilityResponse } from '@/hooks/useApiCalendar';
import { useEffect } from 'react';
import { useState } from 'react';

export default function GenerateTimeSlots({ notAvailableDays, date, changeStepAndSetTime }) {
    const [timeSlots, setTimeSlots] = useState([])
    const generateTimeSlotsFunc = ({ notAvailableDays }) => {
        const timeSlots = [];
        const now = new Date();
        const selectedDate = new Date(date);
        const isToday = now.toDateString() === selectedDate.toDateString();
        const currentHour = now.getHours();
        const currentMinutes = now.getMinutes();
        const startHour = isToday ? currentHour < 8 ? 8 : currentHour : 8;
        const endHour = 21;
        const interval = 30; // 30 minutes

        const formatAMPM = (hour, minutes) => {
            let ampm = hour >= 12 ? 'PM' : 'AM';
            hour = hour % 12;
            hour = hour ? hour : 12; // the hour '0' should be '12'
            const minutesStr = String(minutes).padStart(2, '0');
            return `${hour}:${minutesStr} ${ampm}`;
        };

        for (let hour = startHour; hour < endHour; hour++) {
            for (let minutes = 0; minutes < 60; minutes += interval) {
                if (hour === startHour && minutes < currentMinutes) {
                    continue; // Skip past minutes in the current hour
                }
                const time = formatAMPM(hour, minutes);
                timeSlots.push(time);
            }
        }

        if (!notAvailableDays || notAvailableDays.length === 0) {
            console.log('No notAvailableDays', notAvailableDays);
            return timeSlots;
        }

        // Filter time slots based on notAvailableDays
        const notAvailableTimeSlots = timeSlots.filter(time => {
            return !notAvailableDays.some(day => {
                const startDate = new Date(new Date(day.start).toLocaleString('en-US', { timeZone: 'America/Caracas' }));
                const endDate = new Date(new Date(day.end).toLocaleString('en-US', { timeZone: 'America/Caracas' }));
                const startTime = formatAMPM(startDate.getHours(), startDate.getMinutes());
                const endTime = formatAMPM(endDate.getHours(), endDate.getMinutes());
                
                console.log('time: ', time, 'startTime: ', startTime, 'endTime: ', endTime);
                return time >= startTime && time < endTime;
                
            });
        });

        return notAvailableTimeSlots;
    };
    
    useEffect(() => {
        const data = generateTimeSlotsFunc({ notAvailableDays });
        setTimeSlots(data)
    }, [notAvailableDays]);
    
    return (
        <Paper
            elevation={2}
            sx={{
                backgroundColor: 'white',
                width: '100%',
                minHeight: '336px',
                maxHeight: '336px',
                overflowY: 'scroll',
                padding: '10px',
            }}
        >
            {timeSlots.map((time, index) => (
                    <Paper
                        key={index}
                        onClick={() => changeStepAndSetTime({ date: new Date(date), time })}
                        elevation={0}
                        sx={{
                            padding: '10px',
                            marginTop: '5px',
                            cursor: 'pointer',
                            border: '1px solid rgb(229, 234, 239)',
                            borderRadius: '5px',
                            '&:hover': {
                                border: '2px solid transparent',
                                borderBottomColor: 'primary.main',
                            }
                        }}
                        >
                        {time}
                    </Paper>
                ))}
        </Paper>
    );
}
