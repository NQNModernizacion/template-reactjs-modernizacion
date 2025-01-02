import { Modal } from "..";

const ModalConfirm = ({ object }) => {
  return (
    <Modal
      size="sm"
      show={object.show}
      setShow={object.close}
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
    >
      {object.body}
    </Modal>
  );
};

export default ModalConfirm;
