import { styled } from "@mui/material";
import { Link } from "react-router-dom";

const LinkStyled = styled(Link)(() => ({
  height: "80px",
  width: "100%",
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
}));

const Logo = () => {
  return (
    <LinkStyled to="/">
      
    </LinkStyled>
  );
};

export default Logo;
