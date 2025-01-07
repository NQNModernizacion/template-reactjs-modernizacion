import { Modal } from "..";

interface ModalConfirmProps {
  object: {
    show: boolean;
    close: () => void;
    title: string;
    accept: () => void;
    loading: boolean;
    styles: React.CSSProperties;
    body: React.ReactNode;
  };
}

const ModalConfirm = ({ object }: ModalConfirmProps) => {
  return (
    <Modal
      size="sm"
      show={object.show}
      onHide={object.close}
      // setShow={object.close}
      title={() => object.title}
      footer={() => (
        <>
          <div className="row col-12">
            <div className="col-6">
              <button className="btn btn-primary me-2 col-11" onClick={object.accept}>
                Aceptar
              </button>
            </div>
            <div className="col-6">
              <button className="btn btn btn-dark col-11" onClick={object.close}>
                Cerrar
              </button>
            </div>
          </div>
        </>
      )}
      loading={object.loading}
      // styles={object.styles}
    >
      
      {object.body}
    </Modal>
  );
};

export default ModalConfirm;
