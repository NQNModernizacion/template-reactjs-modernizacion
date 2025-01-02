import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Modal, Table } from '../../../components';
import { UserContext } from '../../../context';
import { dataTable, getActivity } from './handlers';

export default function Actividad() {
  const { actions } = useContext(UserContext);
  const navigate = useNavigate();

  const [actividad, setActividad] = useState({
    data: null,
    error: null,
    loading: false,
  });

  const [open, setOpen] = useState(false);

  const [data, setData] = useState(null);

  useEffect(() => {
    if (!(actions.hasPermission('admin.activity.log') && actions.isAdmin())) {
      if (actions.isAdmin()) {
        navigate('/administrador/roles-permisos');
      } else {
        navigate('/');
      }
    } else {
      getActivity(actividad, setActividad);
    }
  }, []);

  return (
    <Container linkBack={'/administrador/roles-permisos'} titulo={'Logs de Actividad'}>
      {actividad.loading && (
        <>
          <h6 className='mt-3 text-center'>Esto puede demorar...</h6>
          <div className='d-flex justify-content-center'>
            <div className='spinner-border text-primary' role='status' />
          </div>
        </>
      )}
      {actividad.data && <Table data={dataTable(actividad.data, setOpen, setData)} height={500} />}
      <Modal
        setShow={setOpen}
        show={open}
        size={'md'}
        title={() => {
          return 'Atributos';
        }}>
        {data && data.old && (
          <div className='p-3 rounded-2 env-box row'>
            <pre>
              <code className='language-plaintext'>
                {Object.entries(data.old).map((envVar, i) => {
                  return (
                    <p key={i}>
                      <span className='var-name'>{envVar[0]}=</span>
                      <span className='var-content text-wrap'>{envVar[1]}</span>
                    </p>
                  );
                })}
              </code>
            </pre>
          </div>
        )}
        {data && data.attributes && (
          <div className='p-3 rounded-2 env-box row'>
            <pre>
              <code className='language-plaintext'>
                {Object.entries(data.attributes).map((envVar, i) => {
                  return (
                    <p key={i}>
                      <span className='var-name'>{envVar[0]}=</span>
                      <span className='var-content text-wrap'>{envVar[1]}</span>
                    </p>
                  );
                })}
              </code>
            </pre>
          </div>
        )}
      </Modal>
    </Container>
  );
}
