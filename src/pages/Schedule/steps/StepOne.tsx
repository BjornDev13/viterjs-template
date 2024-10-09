import DateCalendarForm from '@/components/global/inputs/DateCalendarForm';
import SelectForm from '@/components/global/SelectForm';
import { CheckAvailabilityResponse } from '@/hooks/useApiCalendar';
import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import GenerateTimeSlots from './GenerateTimeSlots';
import DashboardCard from '@/components/DashboardLayout/components/shared/DashboardCard';
import { useNavigate } from 'react-router-dom';

type StepOneProps = {
    control: any;
    calendars: any;
    getAvailability: any;
    getValues: any;
    notAvailableDays: CheckAvailabilityResponse[] | null;
    changeStepAndSetTime: (date: any, time: string) => void;
}

export default function StepOne({ control, calendars, getAvailability, getValues, notAvailableDays, changeStepAndSetTime }: StepOneProps) {
    const navigate = useNavigate();
    return (
        <>
        <DashboardCard
            title='Reserva una cita de 30 minutos'
            action={(
                <Button
                    onClick={() => navigate("/")}
                    variant="outlined"
                    sx={{
                        width: 'fit-content',
                        fontWeight: 'bold'
                    }}
                >
                    Volver al listado de citas
                </Button>
            )}
            sx={{
                marginBottom: '20px'
            }}
        >
            <Grid
                container
                spacing={1}
            >
                <Grid
                    item
                    xs={12}
                    sm={12}
                    lg={12}
                    xl={12}
                >
                    <SelectForm
                        name="calendarId"
                        label="Mis Calendarios"
                        placeholder='Seleccione un calendario'
                        control={control}
                        validations={{
                            required: 'Este campo es requerido'
                        }}
                        inputProps={{
                            autoComplete: 'new-password',
                            onChange: async (v: any) => {
                                await getAvailability({ calendarId: v.target.value, timeMax: getValues('end').toISOString(), timeMin: getValues('start').toISOString() })
                            }
                        }}
                        data={calendars}
                    />
                </Grid>
            </Grid>
        </DashboardCard>
            <Card sx={{ padding: 0 }} elevation={9} variant={undefined}
            >
                <CardContent sx={{ padding: "0 !important", overflow: 'auto' }}>
                    <Grid
                        container
                    >
                        {
                            notAvailableDays &&
                            (
                                <>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        lg={6}
                                        xl={6}
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Typography
                                            variant="h5"
                                            sx={{ marginBottom: '20px' }}>
                                                Selecciona una fecha acorde para la cita
                                        </Typography>
                                        <Box
                                            sx={{
                                                backgroundColor: 'white',
                                                width: 'fit-content',
                                            }}
                                        >
                                            <DateCalendarForm
                                                control={control}
                                                name='start'
                                                label='Inicia'
                                                required
                                                fullWidth
                                                disablePast
                                                placeholder="DD/MM/AAAA"
                                                validations={{
                                                    required: null
                                                }}
                                                InputProps={{
                                                    sx: {
                                                        fontSize: '19px',
                                                        fontFamily: 'Roboto Regular',
                                                        autoComplete: 'new-password'
                                                    }
                                                }}
                                                onChange={async (v) => {

                                                    const startDate = new Date(v);
                                                    const endDate = new Date(v);
                                                    endDate.setHours(23, 59, 59, 999);

                                                    await getAvailability({
                                                        calendarId: getValues('calendarId'),
                                                        timeMax: endDate.toISOString(),
                                                        timeMin: startDate.toISOString()
                                                    });
                                                }}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        lg={6}
                                        xl={6}
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            padding: '40px',
                                            backgroundColor: 'primary.main',
                                        }
                                        }
                                    >
                                        <Box
                                            sx={{
                                                backgroundColor: 'primary.main',
                                                padding: '10px',
                                                marginBottom: '10px',
                                                borderBottom: '3px solid white'
                                            }}
                                        >
                                        <Typography variant="h6"  color={'white'}>
                                        {`Reserve una cita de 30 minutos para el dia ${getValues('start')?.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}, seleccionando un horario disponible`}
                                        </Typography>
                                        </Box>

                                        <GenerateTimeSlots notAvailableDays={notAvailableDays} date={getValues('start') || new Date()} changeStepAndSetTime={changeStepAndSetTime} />
                                    </Grid>
                                </>
                            )
                        }
                    </Grid>
                </CardContent>
            </Card>
        </>
    );
}
