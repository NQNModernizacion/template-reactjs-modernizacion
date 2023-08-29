import React, { useContext } from 'react';
import { Box, Skeleton, Typography } from '@mui/material';
import { MenuBox } from '../../components';
import { navItems } from './Items';
import { UserContext } from '../../context';

const Menu = () => {
  const { actions, loading } = useContext(UserContext);

  return (
    <div className='bg-body rounded p-3'>
      {/* <Header title={'Menú Principal'} /> */}
      <Box display='grid' gridTemplateColumns='repeat(12, 1fr)' mb='30px' sx={{ height: 'auto' }}>
        <Box gridColumn='span 12' sx={{ backgroundColor: '#1365ae', textAlign: 'center' }}>
          <Typography
            sx={{
              marginTop: '6px',
              color: '#FFF',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              fontSize: '2rem',
            }}
            variant='h2'
          >
            Servicios
          </Typography>
        </Box>
      </Box>

      <div className='container'>
        <div
          className='card-body d-grid gap-1'
          style={{ gridTemplateColumns: 'repeat(auto-fill, 160px)', justifyContent: 'center' }}
        >
          {navItems.map(({ text, icon, to, permission }, key) => {
            {
              /* if (!actions.hasPermission(permission)) {
                return "";
              } */
            }

            return (
              <React.Fragment key={key}>
                <MenuBox image={icon} title={text} to={to} />
              </React.Fragment>
            );
          })}

          {loading && <Skeleton className='skeleton-appcard' variant='rounded' />}

          {loading && <Skeleton className='skeleton-appcard' variant='rounded' />}
        </div>
      </div>
    </div>
  );
};

export default Menu;
