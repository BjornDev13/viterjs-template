import DashboardCard from '@/components/DashboardLayout/components/shared/DashboardCard';
import InputForm from '@/components/global/inputs/InputForm';
import { Button, Grid } from '@mui/material';

type StepTwoProps = {
    control: any;
    setStep: any;
    getValues: any;
    }
export default function StepTwo({ control, setStep, getValues }: StepTwoProps) {

  return(
    <DashboardCard
        title={`Complete los datos faltantes para agendar la cita para el ${getValues('start')?.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} a las ${getValues('start')?.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: true })}`}
        action={(
            <Button
                color="primary"
                variant="outlined"
                onClick={() => setStep(1)}
                sx={{
                    width: 140,
                    fontWeight: 'bold'
                }}
            >
                Volver
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
                lg={12}
                xl={12}
                >
                <InputForm
                    name="summary"
                    label="Asunto de la cita"
                    control={control}
                    placeholder="Coloque el asunto de la cita"
                    /> 
            </Grid>
            <Grid
                item
                xs={12}
                sm={12}
                lg={12}
                xl={12}
                >
                <InputForm
                    name="attendees[0].email"
                    label="Correo del paciente"
                    control={control}
                    placeholder="Coloque el correo del paciente"
                    /> 
                </Grid>
            <Grid
                item
                xs={12}
                sm={12}
                lg={12}
                xl={12}
                >
                <InputForm
                    name="description"
                    label="Descripcion del evento"
                    control={control}
                    placeholder="Coloque una breve descripcion del evento"
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
            <Button
                color="primary"
                variant="contained"
                type='submit'
                sx={{
                    width: 'fit-content',
                    fontWeight: 'bold'
                }}
            >
                Agendar cita
            </Button>
            </Grid>
        </Grid>
    </DashboardCard>
  )
}
