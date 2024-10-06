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
        color="primary"
        variant="contained"
        size="large"
        fullWidth
        onClick={handleSignIn}
      >
        Ingresar con cuenta de Google
      </Button>
    </Box>
    {subtitle}
    </Box>
  )
}

export default AuthLogin;
