import { ListItemIcon } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface IMenuBox {
  title: string;
  image: React.ReactNode;
  to: string;
  hide?: boolean;
}

const MenuBox: React.FC<IMenuBox> = ({ title, image, to, hide }) => {
  const navigate = useNavigate();

  return (
    <div
      hidden
      className={`menu-box d-flex flex-column justify-content-center align-items-center ${
        hide && 'd-none'
      }`}
      onClick={() => {
        navigate(`${to}`);
      }}
    >
      <ListItemIcon
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
        }}
      >
        {image}
      </ListItemIcon>
      <span>{title}</span>
    </div>
  );
};

export default MenuBox;
