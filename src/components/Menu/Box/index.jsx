import { ListItemIcon } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MenuBox = ({ title, image, to, hide }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`menu-box d-flex flex-column justify-content-center align-items-center ${
        hide && "d-none"
      }`}
      hidden
      onClick={() => {
        navigate(`${to}`);
      }}
    >
      <ListItemIcon
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
        }}
      >
        {image}
      </ListItemIcon>
      <span>{title}</span>
    </div>
  );
};

export default MenuBox;
