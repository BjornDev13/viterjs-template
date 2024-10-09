import PageContainer from '@/components/DashboardLayout/components/AdminContainer/PageContainer'
import ListCalendars from '@/components/ListCalendars'
import { Container } from '@mui/material'

export default function Calendars() {
  return (
    <PageContainer title="Home" description="Dashboard">
        <Container sx={{ py: 2, position: 'relative' }}>
          <ListCalendars />
        </Container>
    </PageContainer>
  )
}
