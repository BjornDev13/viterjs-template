import { Accordion, AccordionDetails, AccordionSummary, Box, Chip, Grid, Typography } from '@mui/material'
import LoadListBody from './LoadListBody'
import { formatDate } from '../helpers/dateHelpers'
import { IconArrowDown } from '@tabler/icons-react'
import GetTypeStatus from './GetTypeStatus'

type ListBodyProps = {
    data: any,
    color: string
}
export default function ListBody({ data, color }: ListBodyProps) {

    const whatIsTheDateTimeFormat = (v: any): string => {
        if (v.date) {
            return formatDate({ date: new Date(v.date) })
        } else if (v.dateTime) {
            return formatDate({ dateTime: new Date(v.dateTime) })
        }
    }

    
  return (
    <Box
        sx={{
            marginTop: '10px'
        }}
    >
        {
            data.length > 0 &&
            data.map((v: any, index: number) => (
                <Accordion key={`${v.iCalUID}`} sx={{ borderLeft: '3px solid', borderColor: color }} elevation={9} variant={undefined}>
                    <AccordionSummary
                        expandIcon={<IconArrowDown />}
                        aria-controls={`panel${index}-content`}
                        id={`panel${index}-header`}
                        >
                            <Box
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                    }}
                                >
                                    <Typography fontWeight={500} sx={{ marginRight: '10px' }}>
                                        {whatIsTheDateTimeFormat(v.start)} - {whatIsTheDateTimeFormat(v.end)}
                                    </Typography>
                                    <Typography sx={{ marginRight: '10px' }}>
                                        {v.summary}
                                    </Typography>
                                    <Typography color={color} fontWeight={600}>
                                        {v.organizer.displayName || v.organizer.email}
                                    </Typography>
                                </Box>
                                <GetTypeStatus status={v.status} />
                            </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container>
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography fontWeight={600} >
                                    Descripción:
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography>
                                    {v?.description}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography fontWeight={600} >
                                    localización:
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography>
                                    {v?.location}
                                </Typography>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            ))
        
        }
    </Box>
  )
}
