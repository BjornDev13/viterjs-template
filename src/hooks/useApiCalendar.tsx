import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import useGapi from './useGapi';
import { Box, Typography } from '@mui/material';
import { IconDots } from '@tabler/icons-react';
import { IconPointFilled } from '@tabler/icons-react';
import { enqueueSnackbar } from 'notistack';
import { set } from 'date-fns';

// Declare gapi as a global variable

type ChecAvailabilityProps = {
  calendarId: string;
  timeMin: Date;
  timeMax: Date;
}

export type CheckAvailabilityResponse = {
  start: Date;
  end: Date;
}
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
  timeMax?: string | null;
  timeMin?: string | null;
  q?: string | null;
  showDeleted?: boolean;
  orderBy?: string;
  maxResults?: number;
  pageToken?: string
}

type UseApiCalendarProps = {
  loadEvents?: boolean;
  onlyFindCalendars?: boolean;
  callBack?: (value: any) => void
}

type ColorsType = {
  kind: string;
  updated: string;
  calendar: any;
  event: any;
}

export const useApiCalendar = ({ loadEvents = false, callBack, onlyFindCalendars = false }: UseApiCalendarProps) => {
  const gapiLoaded = useGapi()
  const [isAuth, setIsAuth] = useState(false);
  const [eventsList, setEventsList] = useState([])
  const [colors, setColors] = useState<ColorsType>(null)
  const [calendars, setCalendars] = useState([])
  const [isLoad, setIsLoad] = useState(true)
  const [calendaColorHas, setCalendaColorHas] = useState('primary.main')
  const [filtersEvents, setFiltersEvents] = useState({
    calendarId: "primary",
    showDeleted: false,
    maxResults: 10,
    singleEvents: true
  })

  const navigate = useNavigate()

  const handleSignIn = async () => {
    setIsLoad(true)
    const authInstance = await window.gapi.auth2.getAuthInstance();
    authInstance.signIn().then((user: any) => {
      setIsLoad(false)
      setAuthUserLocalStorage(user)
      enqueueSnackbar(`Bienvenido ${user.wt['Ad']}`, {
        variant: 'success'
      })
      navigate('/')
    });
  };

  const handleSignOut = async () => {
    setIsLoad(true)
    const authInstance = await window.gapi.auth2.getAuthInstance();
    authInstance.signOut().then(() => {
      setIsLoad(false)
      window.sessionStorage.removeItem('auth');
      navigate('/login')
    });
  };

  const handleItemClick = async (name: string) => {
    if (name === 'sign-in') {
      const data = null
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
      if (onlyFindCalendars) setIsLoad(false)
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
          backgroundColor: v.backgroundColor,
          description: v.description,
        }
      )))
    }).catch((error: any) => {
      enqueueSnackbar('Error al consultar los calendarios', {
        variant: 'warning'
      })
      console.log('Error al consultar calendarios', error)
    });
  };

  const createCalendar = async ({ summary, description, colorId }: { summary: string, description: string, colorId: number }): Promise<void> => {
    setIsLoad(true);
    await window.gapi.client.calendar.calendars.insert({
      summary,
      description,
      colorId,
      timeZone: 'America/Caracas'
    }).then((response: any) => {
      setIsLoad(false);
      enqueueSnackbar('El calendario fue creado con éxito', {
        variant: 'success'
      });
      listCalendars(); // Refresh the list of calendars
    }).catch((error: any) => {
      setIsLoad(false);
      enqueueSnackbar('Error al crear el calendario, por favor intente de nuevo', {
        variant: 'error'
      });
      console.error('Error creating calendar', error);
    });
  };

  const getColors = async () => {
    await window.gapi.client.calendar.colors.get().then((response: any) => {
      const colors = response.result;
      setColors(colors)
    }).catch((error: any) => {
      enqueueSnackbar('Error al consultar la lista de colores', {
        variant: 'warning'
      })
      console.error('Error fetching colors:', error);
    });
  };

  const checkAvailability = async ({ calendarId, timeMin, timeMax }: ChecAvailabilityProps): Promise<CheckAvailabilityResponse[] | []> => {
    setIsLoad(true)
    return await window.gapi.client.calendar.freebusy.query({
      timeMin,
      timeMax,
      items: [{ id: calendarId }]
    }).then((response: any) => {
      setIsLoad(false)
      const busyData = response.result.calendars[calendarId].busy
      return busyData || []
    }).catch((error: any) => {
      setIsLoad(false)
      enqueueSnackbar('Error al consultar la disponibilidad', {
        variant: 'warning'
      })
      console.error('Error al consultar la disponibilidad', error);
      return []
    });
  }

  const listUpcomingEvents = async (filters: EventsFilterProps): Promise<void> => {
    setIsLoad(true)
    await window?.gapi?.client?.calendar?.events.list(filters)
      .then((response: any) => {
        setIsLoad(false)
        const events = response.result.items;
        setEventsList(events)
        console.log('Upcoming events:', response.result);
      }).catch((error: any) => {
        setIsLoad(false)
        enqueueSnackbar('Error al consultar eventos', {
          variant: 'warning'
        })
        console.log('Error al consultar eventos', error)
      });
  };


  const setDefaultColorAndDefaultCalendarId = (calendarId: string) => {
    if (calendarId === 'primary') {
      const calendarColorId = calendars.find((calendar: any) => calendar.primary)
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

  const insertEvent = async (data: any): Promise<void> => {
    setIsLoad(true)
    await window?.gapi?.client?.calendar?.events.insert(data).then(() => {
      setIsLoad(false)
      enqueueSnackbar('La Cita fue agendada con exito', {
        variant: 'success'
      })
      navigate('/');
      // setEventsList(prevEvents => [...prevEvents, response.result]);
    }).catch((error: any) => {
      setIsLoad(false)
      enqueueSnackbar('Error al agendar la cita, por favor intente de nuevo', {
        variant: 'error'
      })
      console.log('Error creating event', error);
    });
  };

  const insertAcl = async (calendarId: string, email: string): Promise<void> => {
    setIsLoad(true);
    await window?.gapi?.client?.calendar?.acl.insert({
      calendarId: calendarId,
      resource: {
        role: 'reader',
        scope: {
          type: 'user',
          value: email
        }
      }
    }).then(() => {
      setIsLoad(false);
      enqueueSnackbar('El calendario fue compartido con éxito', {
        variant: 'success'
      });
      listCalendars(); // Refresh the list of calendars
    }).catch((error: any) => {
      setIsLoad(false);
      enqueueSnackbar('Error al insertar el ACL, por favor intente de nuevo', {
        variant: 'error'
      });
      console.error('Error inserting ACL', error);
    });
  };

  useEffect(() => {
    const authData = window.sessionStorage.getItem('auth');
    if (authData) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);

  useEffect(() => {
    if (gapiLoaded && isAuth) {
      getColors()
      listCalendars()
    } else {
      console.log('is nono', gapiLoaded, isAuth)
      setCalendars([])
      setColors(null)
    }
  }, [gapiLoaded, isAuth])


  useEffect(() => {
    if (!loadEvents) return
    if (gapiLoaded && calendars.length > 0 && isAuth) {
      console.log('is inside', isAuth)
      if (filtersEvents.calendarId === 'primary') {
        setDefaultColorAndDefaultCalendarId(filtersEvents.calendarId)
        listUpcomingEvents(filtersEvents)
      } else {
        listUpcomingEvents(filtersEvents)
      }
    }else {
      console.log('is outside',gapiLoaded, calendars,isAuth)
    }
  }, [loadEvents, gapiLoaded, calendars, filtersEvents, isAuth])


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
    setfilters,
    insertEvent,
    isLoad,
    createCalendar,
    insertAcl
  }
}
