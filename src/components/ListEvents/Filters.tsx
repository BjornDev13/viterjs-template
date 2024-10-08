import React from 'react'
import DashboardCard from '../DashboardLayout/components/shared/DashboardCard'
import { Button, Divider, Grid, IconButton } from '@mui/material'
import SelectForm from '../global/SelectForm';
import DatePickerForm from '../global/inputs/DatePickerForm';
import InputForm from '../global/inputs/InputForm';
import { IconZoom } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

type FiltersProps = {
    control: any;
    calendars: any;
    setCalendarSelected: (a: any) => void;
    setfilters: (a: any) => void;
    isLoad: boolean
}

export default function Filters({ isLoad, control, calendars, setCalendarSelected, setfilters }: FiltersProps) {
    const navigate = useNavigate();

    return (
        <DashboardCard
            title="Filtros"
            action={(
                <Button
                    disabled={isLoad}
                    onClick={() => navigate("/schedule")}
                    variant="outlined"
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
                        name='imeMin'
                        label='Desde'
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
                        label='Hasta'
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
                            disabled={isLoad}
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
