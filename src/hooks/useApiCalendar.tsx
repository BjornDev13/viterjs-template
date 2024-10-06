import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import useGapi from './useGapi';
import { Box, Typography } from '@mui/material';
import { IconDots } from '@tabler/icons-react';
import { IconPointFilled } from '@tabler/icons-react';

// Declare gapi as a global variable

interface AuthHook {
    handleItemClick: (name: string) => any
    handleSignIn: () => void;
    handleSignOut: () => void;
    listCalendars: () => void;
    checkAvailability: () => void;
    isAuth: boolean,
    eventsList: any
  }

export interface GoogleAuthResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
}

type EventsFilterProps = {
  calendarId?: string;
  timeMax?: Date | null;
  timeMin?: Date | null;
  q?: string;
  showDeleted?: boolean;
  orderBy?: string;
  maxResults?: number;
  pageToken?: string
}

type UseApiCalendarProps = {
  loadEvents?: boolean;
  callBack?: (value: any) => void
}

type ColorsType = {
  kind: string;
  updated: string;
  calendar: any;
  event: any;
}

export const useApiCalendar = ({ loadEvents = false, callBack }: UseApiCalendarProps) =>  {
    const gapiLoaded = useGapi()
    const [isAuth, setIsAuth] = useState(false);
    const [eventsList, setEventsList] = useState([])
    const [colors, setColors] = useState<ColorsType>(null)
    const [calendars, setCalendars] = useState([])
    const [calendaColorHas, setCalendaColorHas] = useState('primary.main')
    const [filtersEvents, setFiltersEvents] = useState({
      calendarId: "primary",
      showDeleted: false,
      maxResults: 10,
      singleEvents: true
    })

    const navigate = useNavigate()

    const handleSignIn = async () => {
      const authInstance = await window.gapi.auth2.getAuthInstance();
      authInstance.signIn().then(user => {
        console.log('User signed in', user);
        setAuthUserLocalStorage(user)
        navigate('/')

      });
    };

    const handleSignOut = async  () => {
      const authInstance = await window.gapi.auth2.getAuthInstance();
      authInstance.signOut().then(() => {
        console.log('User signed out');
        window.sessionStorage.removeItem('auth');
        navigate('/login')
      });
    };

      const handleItemClick = async (name: string) => {
        if (name === 'sign-in') {
          const data = null
          console.log('q es etooooo', data)
          return data
        } else if (name === 'sign-out') {
          const data = null
          return data
        }
      }

    
      const setAuthUserLocalStorage = (dataUser) => {
        const {
            wt,
            xc,
            Ca,
          } = dataUser;

        const data = {
          dataProfile: {
            fullname: wt['Ad'],
            email: wt.cu,
            id: wt['NT'],
            picture: wt['hK']
          },
          dataSession: xc,
          id: Ca
        }
        window.sessionStorage.setItem('auth', JSON.stringify(data));
      };

      const listCalendars = async () => {
        await window.gapi.client.calendar.calendarList.list().then((response: any) => {
          const data = response.result;
          setCalendars(data.items?.map((v: any) => (
            {
              label: (
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                  <Typography component="span">{v.summary}</Typography>
                  <IconPointFilled color={v.backgroundColor} />
                </Box>
              ),
              value: v.id,
              colorId: v.backgroundColor,
              primary: v?.primary,
              backgroundColor: v.backgroundColor
            }
          )))
        }).catch((error: any) => {
          console.log('Error al consultar calendarios', error)
        });
      };

      const getColors = async () => {
        await window.gapi.client.calendar.colors.get().then(response => {
          const colors = response.result;
          setColors(colors)
        }).catch(error => {
          console.error('Error fetching colors:', error);
        });
      };

      const checkAvailability = async () => {
        const timeMin = new Date().toISOString();
        const timeMax = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString();
    
        await window.gapi.client.calendar.freebusy.query({
          timeMin,
          timeMax,
          items: [
            { id: "08dfc8b03f64d732aaab11ed030d81052e90e3500f9b271c9c94b14c8e15ee84@group.calendar.google.com" },
            { id: "joinervargas24@gmail.com" },

          ]
        }).then(response => {
          console.log(response.result);
        });
      };

      const listUpcomingEvents = async (filters: EventsFilterProps): Promise<void> => {
        await window?.gapi?.client?.calendar?.events.list(filters)
        .then((response: any) => {
          const events = response.result.items;
          setEventsList(events)
          console.log('Upcoming events:', response.result);
        }).catch((error: any) => {
          console.log('Error al consultar eventos', error)
        });
      };


      const setDefaultColorAndDefaultCalendarId = (calendarId: string) => {
        if (calendarId === 'primary') {
          const calendarColorId = calendars.find((calendar: any) => calendar.primary )
          console.log('calendarColorId', calendars, calendarId, calendarColorId)
          setCalendaColorHas(calendarColorId.backgroundColor)
          callBack(calendarColorId.value)
        }
      }

      const setfilters = (data: EventsFilterProps) => {
        setFiltersEvents(prevFilters => {
          const newFilters = { ...prevFilters };
          Object.keys(data).forEach(key => {
            if (data[key] !== prevFilters[key]) {
              newFilters[key] = data[key];
            }
          });
          return newFilters;
        });
      }

      useEffect(() => {
        if (gapiLoaded) {
          getColors()
        }
      }, [gapiLoaded])

      useEffect(() => {
        if (gapiLoaded) {
          listCalendars()
        }
      }, [gapiLoaded])

      useEffect(() => {
        if (!loadEvents) return
        if (gapiLoaded && calendars.length > 0) {
          console.log('filtersEvents:', filtersEvents)
          if (filtersEvents.calendarId === 'primary') {
            setDefaultColorAndDefaultCalendarId(filtersEvents.calendarId)
            listUpcomingEvents(filtersEvents)
          } else {
            listUpcomingEvents(filtersEvents)
          }
        }
      }, [loadEvents, gapiLoaded, calendars, filtersEvents])
      

  return {
    handleItemClick,
    handleSignIn,
    handleSignOut,
    isAuth,
    listCalendars,
    checkAvailability,
    eventsList,
    colors,
    calendars,
    calendaColorHas,
    setCalendaColorHas,
    setfilters
  }
}
