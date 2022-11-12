import { Modal as M } from 'react-bootstrap';

const Modal = ({ size, show, setShow, title, footer, children, loading }) => {
    const hide = () => setShow(false);

    return (
        <M
            show={show}
            onHide={hide}
            size={size ? size : 'lg'}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <M.Header closeButton>
                <M.Title id="contained-modal-title-vcenter">{!loading && title()}</M.Title>
            </M.Header>
            <M.Body>{children}</M.Body>
            {footer && <M.Footer>{!loading && footer()}</M.Footer>}
        </M>
    );
};

export default Modal;
