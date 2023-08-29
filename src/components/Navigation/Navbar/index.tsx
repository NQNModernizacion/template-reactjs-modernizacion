import { LogoutOutlined } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { Navbar as NavbarBootstrap } from 'react-bootstrap';
import { closeSession } from './handlers';

interface INavbar {
  data: any;
  renderProp?: () => React.ReactNode;
}

const Navbar: React.FC<INavbar> = ({ data, renderProp }) => {
  const handleLogout = () => closeSession();

  return (
    <Box sx={{ marginTop: '3%' }}>
      <NavbarBootstrap className='d-flex justify-content-around flex-wrap p-2 gap-1'>
        <img
          alt='Logo Neuquen Capital'
          height='55%'
          src='https://weblogin.muninqn.gov.ar/apps/estilos_globales/logo.png'
        />
        <Box className='d-flex align-items-center gap-sm-2'>
          <Box
            alt='profile'
            borderRadius='50%'
            component='img'
            height='35px'
            src={data?.imagenUrl}
            sx={{ objectFit: 'cover' }}
            width='35px'
          />
          <Box className='d-none d-sm-block' textAlign='left'>
            <Typography fontSize='0.85rem' fontWeight='bold'>
              <label>{data?.nombre}</label>
            </Typography>
            <Typography fontSize='0.75rem'>
              <label>{data?.correoElectronico}</label>
            </Typography>
          </Box>
          <Box className='vr d-none d-sm-block' />
          <Box className='ms-2 ms-sm-none'>
            <Button className='p-0' onClick={() => handleLogout()}>
              <LogoutOutlined sx={{ color: '#1365ae', fontSize: '25px' }} />
              <Typography
                as='label'
                sx={{
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  marginLeft: '4px',
                }}
              >
                <span role='button'>Salir</span>
              </Typography>
            </Button>
          </Box>
        </Box>
      </NavbarBootstrap>
      <div className='container'>
        {renderProp && renderProp()}

        {/* <div className="row pt-3 m-0">
          <Outlet />
        </div> */}
      </div>
    </Box>
  );
};

export default Navbar;
