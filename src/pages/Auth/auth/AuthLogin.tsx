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
            backgroundColor: "primary.main",
            fontWeight: 700,
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            borderRadius: '20px',
            marginLeft: 'auto',
            marginRight: 'auto',
            justifyContent: 'flex-start',
            ":hover": { backgroundColor: "primary.main" }
          }}
        onClick={handleSignIn}
      >
        <Box
          sx={{
            width: '70px',
            height: '70px',
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '8px'
          }}
        >
          <img src="/images/logos/google-logo.png" alt="Google logo" />
        </Box>
        Ingresar con cuenta de Google
      </Button>
    </Box>
    {subtitle}
    </Box>
  )
}

export default AuthLogin;
