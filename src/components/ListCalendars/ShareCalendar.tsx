import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Grid, Box, Typography } from '@mui/material';
import InputForm from '../global/inputs/InputForm';
import SelectForm from '../global/SelectForm';
import { IconPointFilled } from '@tabler/icons-react';
import InputColor from '../global/InputColor/InputColor';

interface NewCalendarProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: { email: string }) => void;
}

const ShareCalendar: React.FC<NewCalendarProps> = ({ open, onClose, onSubmit }) => {
    const { control, handleSubmit, reset } = useForm<{ email: string }>({
        defaultValues: { email: '' },
    });

    const handleClose = () => {
        reset();
        onClose();
    };
    const handleFormSubmit = (data: { email: string }) => {
        onSubmit(data);
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <DialogTitle>Coloque el correo con el cual compartira el calendario</DialogTitle>
                <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} mt={2}>
                                <InputForm
                                    name="email"
                                    label="Correo del usuario"
                                    control={control}
                                    placeholder="Coloque el correo del usuario"
                                    />
                            </Grid>
                            </Grid>
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button type='submit' color="primary">
                        Compartir
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default ShareCalendar;