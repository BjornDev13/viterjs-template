import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import { useApiCalendar } from "@/hooks/useApiCalendar";
interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const { handleSignIn } = useApiCalendar({ loadEvents: false })
  
  return (
    <Box>
    {title ? (
      <Typography fontWeight="700" variant="h2" mb={1}>
        {title}
      </Typography>
    ) : null}

    {subtext}

    <Stack>
    </Stack>
    <Box mt="25px">
      <Button
        color="secondary"
        variant="outlined"
        size="large"
        sx={{
            width: 'fit-content',
            padding: '5px',
            backgroundColor: "rgb(59 130 246)",
            fontWeight: 700,
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            border: 'none',
            borderTopLeftRadius: '50px',
            borderBottomLeftRadius: '50px',
            borderTopRightRadius: '5px',
            borderBottomRightRadius: '5px',
            marginLeft: 'auto',
            marginRight: 'auto',
            justifyContent: 'flex-start',
            ":hover": { backgroundColor: "rgb(59 130 246)", border: 'none' }
          }}
        onClick={handleSignIn}
      >
        <Box
          sx={{
            width: '70px',
            height: '70px',
            backgroundColor: 'white',
            borderRadius: '50px',
            padding: '5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '8px',
          }}
        >
          <img src="/images/logos/google-logo.png" alt="Google logo" />
        </Box>
        <Typography sx={{
          fontSize: '1rem',
          fontWeight: 700,
          color: 'white',
        }}>
          Iniciar sesión con Google
        </Typography>
      </Button>
    </Box>
    {subtitle}
    </Box>
  )
}

export default AuthLogin;
