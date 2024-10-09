import { Container } from '@mui/material';
import PageContainer from '@/components/DashboardLayout/components/AdminContainer/PageContainer';
import ListEvents from '@/components/ListEvents';
// import { useApiCalendar } from '@/hooks/useApiCalendar';


export default function Home() {

  // const { checkAvailability, listCalendars } = useApiCalendar()
  return (
    <PageContainer title="Home" description="Dashboard">
        <Container sx={{ py: 2, position: 'relative' }}>
          <ListEvents />
        </Container>
    </PageContainer>
  )
}


