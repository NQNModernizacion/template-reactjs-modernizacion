import { Modal as M } from "react-bootstrap"

const Modal: ModalProps = ({
    size = "lg",
    show,
    onHide,
    title,
    footer,
    children,
    loading,
    styles,
    variant = "",
    closeButton = true,
}) => {
    return (
        <M
            show={show}
            onHide={onHide}
            size={size}
            centered
            backdrop='static'
            variant
        >
            <M.Header
                closeButton={closeButton}
                style={styles ? styles.header : {}}
                className={"pt-2 pb-2 " + variant}
            >
                <M.Title>{!loading && title()}</M.Title>
            </M.Header>
            <M.Body>{children}</M.Body>
            {footer && <M.Footer>{!loading && footer()}</M.Footer>}
        </M>
    )
}

export default Modal
