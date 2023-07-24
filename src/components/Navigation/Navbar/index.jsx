import { LogoutOutlined } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserWrapper";
import { getParams } from "../../../utils/common";
import { isValidSession, logout } from "../../../utils/sessionStorage";

const Layout = ({ renderProp }) => {
  const token = getParams().token;
  const nav = useNavigate();

  const { store } = useContext(UserContext);

  const handleLogout = () => logout();

  useEffect(() => {
    if (!isValidSession() && !token) nav("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isValidSession()) return null;

  return (
    <Box>
      <Navbar className="d-flex justify-content-around flex-wrap p-2 mt-1 gap-1">
        <img
          alt="Logo Neuquen Capital"
          height="55%"
          src="https://weblogin.muninqn.gov.ar/apps/estilos_globales/logo.png"
        />
        <Box className="d-flex align-items-center gap-sm-2">
          <Box
            component="img"
            alt="profile"
            src={store?.data?.imagenUrl}
            height="35px"
            width="35px"
            borderRadius="50%"
            sx={{ objectFit: "cover" }}
          />
          <Box textAlign="left" className="d-none d-sm-block">
            <Typography fontWeight="bold" fontSize="0.85rem">
              <label>{store?.data?.nombre}</label>
            </Typography>
            <Typography fontSize="0.75rem">
              <label>{store?.data?.correoElectronico}</label>
            </Typography>
          </Box>
          <Box className="vr d-none d-sm-block"></Box>
          <Box className="ms-2 ms-sm-none">
            <Button onClick={handleLogout} className="p-0">
              <LogoutOutlined sx={{ color: "#1365ae", fontSize: "25px" }} />
              <Typography
                as="label"
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                  marginLeft: "4px",
                }}
              >
                Salir
              </Typography>
            </Button>
          </Box>
        </Box>
      </Navbar>
    </Box>
  );
};

export default Layout;
