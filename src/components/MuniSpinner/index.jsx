import { CircularProgress } from '@mui/material';
import { ASSETS_URL } from '../../config';

const MuniSpinner = ({
    size = '70px',
    circularProgressSize = 100,
    textoSpinner = '',   
    variant ='primary',
}) => {
    const fileName = variant === 'primary' ? 'bola.png': 'bola-blanco.png' 

    return (
        <div className="d-flex align-items-center justify-content-center gap-4">
            {textoSpinner !== '' && <h2>{textoSpinner}</h2>}
            <div className="d-flex justify-content-center align-items-center">
                <CircularProgress
                    size={circularProgressSize}
                    className='color-primary'
                />
                <img
                    src={ASSETS_URL + fileName}
                    alt="Municipalidad Spinner"
                    style={{ width: size, height: size, position: 'absolute' }}
                />
            </div>
        </div>
    );
};

export default MuniSpinner;
