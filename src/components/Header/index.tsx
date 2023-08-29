import { Typography, Box } from '@mui/material';

interface IHeader {
  title: string;
  subtitle: string;
  subtitleYear: string;
}

const Header: React.FC<IHeader> = ({ title, subtitle, subtitleYear }) => {
  return (
    <Box display='grid' gridTemplateColumns='repeat(12, 1fr)' mb='30px' sx={{ height: 'auto' }}>
      <Box gridColumn='span 8' sx={{ backgroundColor: '#51D2FF', textAlign: 'center' }}>
        <Typography
          sx={{
            marginTop: '6px',
            color: '#016BB0',
            textTransform: 'uppercase',
            fontWeight: 'bold',
          }}
          variant='h2'
        >
          {title}
        </Typography>
        <Typography sx={{ color: '#016BB0', fontWeight: 'bold' }} variant='h5'>
          <a href='www.neuquencapital.gov.ar' rel='noreferrer noopener' target='_blank'>
            www.neuquencapital.gov.ar
          </a>
        </Typography>
      </Box>
      <Box
        gridColumn='span 4'
        sx={{
          backgroundColor: '#1365ae',
          justifyContent: 'center',
          alignContent: 'center',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4px',
        }}
      >
        <Typography sx={{ color: 'white', fontWeight: 'bold' }} variant='h6'>
          {subtitle}
        </Typography>

        <Typography sx={{ color: '#51D2FF', fontWeight: 'bold' }} variant='h6'>
          {subtitleYear}
        </Typography>
      </Box>
    </Box>
  );
};

export default Header;
