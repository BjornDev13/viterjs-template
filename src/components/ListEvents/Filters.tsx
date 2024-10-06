import React from 'react'
import DashboardCard from '../DashboardLayout/components/shared/DashboardCard'
import { Button, Divider, Grid, IconButton } from '@mui/material'
import SelectForm from '../global/SelectForm';
import DatePickerForm from '../global/inputs/DatePickerForm';
import InputForm from '../global/inputs/InputForm';
import { IconZoom } from '@tabler/icons-react';

type FiltersProps = {
    control: any;
    calendars: any;
    setCalendarSelected: (a: any) => void;
    setfilters: (a: any) => void;
}

export default function Filters({ control, calendars, setCalendarSelected, setfilters }: FiltersProps) {
    return (
        <DashboardCard
            title="Filtros"
            action={(
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => console.log('agregar')}
                    sx={{
                        width: 140,
                        fontWeight: 'bold'
                    }}
                >
                    Nuevo Evento
                </Button>
            )}
        >
            <Grid
                container
                spacing={1}
            >
                <Grid
                    item
                    xs={12}
                    sm={12}
                    lg={4}
                    xl={4}
                >
                    <SelectForm
                        name="calendarId"
                        label="Mis Calendarios"
                        control={control}
                        validations={{
                            required: 'Este campo es requerido'
                        }}
                        inputProps={{
                            autoComplete: 'new-password',
                            onChange: (v) => {
                                setfilters({ calendarId: v.target.value})
                                setCalendarSelected(v.target.value)
                            }
                          }}
                        data={calendars}
                    />
                </Grid>

                <Grid
                    item
                    xs={12}
                    sm={12}
                    lg={4}
                    xl={4}
                >
                    <SelectForm
                        name="showDeleted"
                        label="Mostrar eliminados"
                        control={control}
                        validations={{
                            required: null
                        }}
                        data={[
                            {
                                label: 'No',
                                value: 'false'
                            },
                            {
                                label: 'Si',
                                value: 'true'
                            }
                        ]}
                    />
                </Grid>

                <Grid
                    item
                    xs={12}
                    sm={12}
                    lg={4}
                    xl={4}
                >
                    <SelectForm
                        name="orderBy"
                        label="Ordenar por"
                        control={control}
                        validations={{
                            required: null
                        }}
                        data={[
                            {
                                label: 'Ordena por fecha/hora de inicio',
                                value: 'startTime'
                            },
                            {
                                label: 'Ordena por hora de última modificación',
                                value: 'updated'
                            }
                        ]}
                    />
                </Grid>

                <Grid
                    item
                    xs={12}
                    sm={12}
                    lg={12}
                    xl={12}
                >
                    <Divider sx={{ marginTop: '5px', marginBottom: '5px' }} />
                </Grid>

                <Grid
                        item
                        xs={12}
                        sm={12}
                        lg={6}
                        xl={6}
                    >
                    <DatePickerForm
                        control={control}
                        name='timeMin'
                        label='Tiempo minimo'
                        required
                        fullWidth
                        disableFuture
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
                    />
                </Grid>

                <Grid
                        item
                        xs={12}
                        sm={12}
                        lg={6}
                        xl={6}
                    >
                    <DatePickerForm
                        control={control}
                        name='timeMax'
                        label='Tiempo Maximo'
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
                    />
                </Grid>
                <Grid
                        item
                        xs={12}
                        sm={12}
                        lg={12}
                        xl={12}
                    >
                        <Divider sx={{ marginTop: '5px', marginBottom: '5px'}} />
                    </Grid>
                <Grid
                        item
                        xs={12}
                        sm={12}
                        lg={12}
                        xl={12}
                    >
                        <InputForm
                            name="q"
                            label="Correo de usuario / Nombre / Descripcion de la cita"
                            control={control}
                            placeholder="Correo de usuario / Nombre / Descripcion de la cita"
                            />
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sm={12}
                        lg={12}
                        xl={12}
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end'
                        }}
                    >
                        <IconButton
                            type='submit'
                            sx={{
                                backgroundColor: 'primary.main',
                                color: 'white',
                                fontWeight: 'bold',
                                '&:hover': {
                                    backgroundColor: 'primary.main',
                                    color: 'white'
                                }
                            }}
                        ><IconZoom /></IconButton>
                    </Grid>
            </Grid>
        </DashboardCard>
    )
}
