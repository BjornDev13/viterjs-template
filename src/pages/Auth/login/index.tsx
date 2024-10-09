import { Grid, Box, Card, Stack, Typography } from "@mui/material";
// components
import Logo from "@/components/DashboardLayout/layout/shared/logo/Logo";
import AuthLogin from "../auth/AuthLogin";
import PageContainer from "@/components/container/PageContainer";

const Login2 = () => {
  return (
    <PageContainer title="Login" description="this is Login page">
      <Box
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: "0.3",
          },
        }}
      >
        <Grid
          container
          spacing={0}
          justifyContent="center"
          sx={{ height: "100vh" }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card
              elevation={9}
              sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}
            >
              <Box
                sx={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  height: "80px",
                  width: "300px",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  textDecoration: "none",
                  backgroundImage: "url('/images/logos/ICONO-UrgentCare.png')",
                  backgroundSize: "280px",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  borderRadius: "20px",
                  border: 'none',
                  marginTop: "5px",
                }}
              >

                </Box>
              <AuthLogin
                subtext={
                  <Typography
                    variant="h3"
                    textAlign="center"
                    color="textSecondary"
                    mb={1}
                    mt={2}
                  >
                    Citas de Citas Venemergencia
                  </Typography>
                }
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};
export default Login2;
