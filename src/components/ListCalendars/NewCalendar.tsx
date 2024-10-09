import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Grid, Box, Typography } from '@mui/material';
import InputForm from '../global/inputs/InputForm';
import SelectForm from '../global/SelectForm';
import { IconPointFilled } from '@tabler/icons-react';

interface NewCalendarProps {
    open: boolean;
    colors: any;
    onClose: () => void;
    onSubmit: (data: { summary: string, description: string, colorId: number }) => void;
}

const CreateCalendar: React.FC<NewCalendarProps> = ({ open, onClose, onSubmit, colors }) => {
    const { control, handleSubmit, reset } = useForm<{ summary: string }>({
        defaultValues: { summary: '' },
    });

    const handleClose = () => {
        reset();
        onClose();
    };

    const handleFormSubmit = (data: { summary: string, description: string, colorId: number }) => {
        onSubmit(data);
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Crear Nuevo Calendario</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <InputForm
                                name="summary"
                                label="Nombre del calendario"
                                control={control}
                                placeholder="Coloque el nombre que lleva este calenario"
                                />
                        </Grid>
                        <Grid item xs={12}>
                            <InputForm
                                name="description"
                                label="Descripcion del calendario"
                                control={control}
                                placeholder="Coloque una breve descripcion del calendario"
                                />
                        </Grid>
                        {
                            colors &&
                            colors.calendar &&
                            (
                                <Grid item xs={12}>
                                    <SelectForm
                                        name="colorId"
                                        label="Seleccione el color del calendario"
                                        control={control}
                                        validations={{
                                            required: 'El color es requerido'
                                        }}
                                        inputProps={{
                                            autoComplete: 'new-password',
                                        }}
                                        data={Object.keys(colors.calendar).map(key => ({
                                            value: key,
                                            label: (
                                                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                                  <Typography component="span">{colors.calendar[key].background}</Typography>
                                                  <IconPointFilled color={colors.calendar[key].background} />
                                                </Box>
                                              )
                                        }))}
                                    />
                                </Grid>

                            )
                        }
                        </Grid>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={handleSubmit(handleFormSubmit)} color="primary">
                    Crear
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateCalendar;