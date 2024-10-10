import DashboardCard from '@/components/DashboardLayout/components/shared/DashboardCard';
import InputColor from '@/components/global/InputColor/InputColor';
import InputForm from '@/components/global/inputs/InputForm';
import SelectForm from '@/components/global/SelectForm';
import { Box, Button, CircularProgress, Grid, LinearProgress } from '@mui/material';

type StepTwoProps = {
    control: any;
    setStep: any;
    getValues: any;
    colors: any;
    setValues: any;
    isLoad: boolean;
    }
export default function StepTwo({ control, setStep, getValues, colors, setValues, isLoad }: StepTwoProps) {

  return(
    <DashboardCard
        showProgress={isLoad}
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
                lg={6}
                xl={6}
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
                lg={6}
                xl={6}
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
                lg={6}
                xl={6}
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
                lg={6}
                xl={6}
                >
                    <InputColor colors={colors} setValues={setValues} />
                </Grid>
            <Grid
                item
                xs={12}
                sm={12}
                lg={12}
                xl={12}
                >
                <SelectForm
                        name="location"
                        label="Seleccione la ubicacion de la cita"
                        control={control}
                        validations={{
                            required: null
                        }}
                        inputProps={{
                            autoComplete: 'new-password',
                          }}
                        data={[
                            {
                                label: 'UC - Bello Campo',
                                value: 'UC - Bello Campo'
                            },
                            {
                                label: 'UC - La Candelaria',
                                value: 'UC - La Candelaria'
                            },
                            {
                                label: 'UC - La Viña',
                                value: 'UC - La Viña'
                            },
                            {
                                label: 'UC - Lecheria',
                                value: 'UC - Lecheria'
                            },
                            {
                                label: 'UC - Maracaibo',
                                value: 'UC - Maracaibo'
                            },
                        ]}
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
                disabled={isLoad}
                type='submit'
                sx={{
                    width: 'fit-content',
                    fontWeight: 'bold'
                }}
            >
                {
                    isLoad ? (<CircularProgress size={30} color="secondary" />) :
                    'Agendar cita'
                }
            </Button>
            </Grid>
        </Grid>
    </DashboardCard>
  )
}
