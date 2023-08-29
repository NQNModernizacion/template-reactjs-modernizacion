import { Modal } from '..';

interface IModalConfirm {
  object: any;
}

const ModalConfirm: React.FC<IModalConfirm> = ({ object }) => {
  return (
    <Modal
      footer={() => (
        <>
          <div className='row col-12'>
            <div className='col-6'>
              <button className='btn btn-primary me-2 col-11' onClick={object.accept}>
                Aceptar
              </button>
            </div>
            <div className='col-6'>
              <button className='btn btn btn-dark col-11' onClick={object.close}>
                Cerrar
              </button>
            </div>
          </div>
        </>
      )}
      setShow={object.close}
      show={object.show}
      size='sm'
      title={() => object.title}
    >
      {object.body}
    </Modal>
  );
};

export default ModalConfirm;
