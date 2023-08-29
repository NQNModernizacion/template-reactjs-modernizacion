import { Modal as M } from 'react-bootstrap';

interface IModal {
  size?: 'sm' | 'lg' | 'xl';
  style?: object;
  show: boolean;
  setShow: (show: boolean) => void;
  title: () => React.ReactNode;
  footer?: () => React.ReactNode;
  children: React.ReactNode;
  loading?: boolean;
}

const Modal: React.FC<IModal> = ({
  size,
  style,
  show,
  setShow,
  title,
  footer,
  children,
  loading,
}) => {
  const hide = () => setShow(false);

  return (
    <M
      centered
      aria-labelledby='contained-modal-title-vcenter'
      show={show}
      size={size ? size : 'lg'}
      style={style}
      onHide={hide}
    >
      <M.Header closeButton>
        <M.Title id='contained-modal-title-vcenter'>{!loading && title()}</M.Title>
      </M.Header>
      <M.Body>{children}</M.Body>
      {footer && <M.Footer>{!loading && footer()}</M.Footer>}
    </M>
  );
};

export default Modal;
