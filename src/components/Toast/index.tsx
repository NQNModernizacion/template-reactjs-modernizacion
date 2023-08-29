import { Toast, ToastContainer } from 'react-bootstrap';

interface IToast {
  position: string;
  delay: number;
  onClose: () => void;
  show: boolean;
  children: React.ReactNode;
}

const index: React.FC<IToast> = ({ position, delay, onClose, children, show }) => {
  return (
    <ToastContainer className='top-50' position={position}>
      <Toast autohide={delay} delay={delay} show={show} onClick={onClose} onClose={onClose}>
        <Toast.Body className='pt-2'>
          <div className='ms-auto d-flex ms-auto'>
            <i className='fa-solid fa-circle-xmark ms-auto my-auto' />
          </div>
          <div className='row col-12'>{children}</div>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default index;
