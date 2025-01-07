import React from "react";
import { Modal as M } from "react-bootstrap"

interface ModalProps {
    size?: "sm" | "lg" | "xl";
    show: boolean;
    onHide: () => void;
    title: () => React.ReactNode;
    footer?: () => React.ReactNode;
    children: React.ReactNode;
    loading?: boolean;
    styles?: {
        header?: React.CSSProperties;
    };
    variant?: string;
    closeButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({
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
