import { Toast, ToastContainer } from 'react-bootstrap';

const index = ({ position, delay, onClose, children, show }) => {
    return (
        <ToastContainer position={position} className="top-50">
            <Toast show={show} delay={delay} autohide={delay} onClose={onClose} onClick={onClose}>
                <Toast.Body className="pt-2">
                    <div className="ms-auto d-flex ms-auto">
                        <i className="fa-solid fa-circle-xmark ms-auto my-auto"></i>
                    </div>
                    <div className="row col-12">{children}</div>
                </Toast.Body>
            </Toast>
        </ToastContainer>
    );
};

export default index;
