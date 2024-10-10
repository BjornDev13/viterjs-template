import { Accordion, AccordionDetails, AccordionSummary, Box, Card, CardContent, Chip, Grid, IconButton, Typography } from '@mui/material'
import LoadListBody from './LoadListBody'
import { formatDate } from '../helpers/dateHelpers'
import { IconArrowDown } from '@tabler/icons-react'
import { IconShare } from '@tabler/icons-react'

type ListBodyProps = {
    data: any;
    setOpenShareCalendar: any;
}
export default function ListBody({ data, setOpenShareCalendar }: ListBodyProps) {

    
  return (
    <Box
        sx={{
            marginTop: '10px'
        }}
    >
        {
            data.length > 0 &&
            data.map((v: any, index: number) => (
                <Card 
                    sx={{
                        padding: '10px 20px',
                        height: '50px',
                        borderRadius: '5px',
                        marginTop: '10px',
                        borderLeft: `3px solid ${v.backgroundColor}`
                    }}
                    elevation={9}
                    variant={undefined}
                    key={v.value}
                    >
                    <CardContent sx={{ padding: "0 !important", overflow: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography>
                            {v.label}
                        </Typography>
                        <IconButton
                            onClick={() => setOpenShareCalendar(v.value)}
                        >
                            <IconShare />
                        </IconButton>
                    </CardContent>
                </Card>
            ))
        
        }
    </Box>
  )
}
