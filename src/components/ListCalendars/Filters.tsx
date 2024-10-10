import React from 'react'
import DashboardCard from '../DashboardLayout/components/shared/DashboardCard'
import { Button, Divider, Grid } from '@mui/material'
import SelectForm from '../global/SelectForm';
import { useNavigate } from 'react-router-dom';

type FiltersProps = {
    control: any;
    setfilters: (a: any) => void;
    setOpen: any
}

export default function Filters({ control, setfilters, setOpen }: FiltersProps) {

    return (
        <DashboardCard
            title="Filtros"
            action={(
                <Button
                    onClick={() => setOpen(true)}
                    variant="outlined"
                    sx={{
                        width: 'fit-content',
                        fontWeight: 'bold'
                    }}
                >
                    Nuevo calendario
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
                        name="showDeleted"
                        label="Mostrar eliminados"
                        control={control}
                        validations={{
                            required: null
                        }}
                        inputProps={{
                            autoComplete: 'new-password',
                            onChange: (v: any) => {
                                setfilters({ showDeleted: v.target.value})
                            }
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
                        name="showHidden"
                        label="Mostrar calendarios ocultos"
                        control={control}
                        validations={{
                            required: null
                        }}
                        inputProps={{
                            autoComplete: 'new-password',
                            onChange: (v: any) => {
                                setfilters({ showHidden: v.target.value})
                            }
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
                        name="maxResults"
                        label="Limite por pagina"
                        control={control}
                        validations={{
                            required: null
                        }}
                        inputProps={{
                            autoComplete: 'new-password',
                            onChange: (v: any) => {
                                setfilters({ maxResults: v.target.value})
                            }
                          }}
                        data={[
                            {
                                label: '1',
                                value: '1'
                            },
                            {
                                label: '5',
                                value: '5'
                            },
                            {
                                label: '10',
                                value: '10'
                            },
                            {
                                label: '15',
                                value: '15'
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
            </Grid>
        </DashboardCard>
    )
}
