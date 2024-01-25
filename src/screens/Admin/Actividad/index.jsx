import { useState, useEffect, useContext } from "react"
import { UserContext } from "./../../../context";
import { useNavigate, Link } from "react-router-dom";
import { getActivity, dataTable } from "./handlers";
import { Table, Modal } from '../../../components'
import { NavigateBeforeOutlined } from '@mui/icons-material';
export default function Actividad() {

    const { actions } = useContext(UserContext);
    const navigate = useNavigate();

    const [actividad, setActividad] = useState({
        data: null, error: null, loading: false
    })

    const [open, setOpen] = useState(false);

    const [data, setData] = useState(null);

    useEffect(() => {
      if (!(actions.hasPermission('admin.activity.log') && actions.isAdmin())) {
          if (actions.isAdmin()) {
              navigate('/administrador/roles-permisos')
          } else {
              navigate('/');
          }
      }else{
        getActivity(actividad, setActividad)
      }
  }, [])

    return (
        <section className="col-12 col-md-12 col-xl-12 mx-auto mb-5">
            <div className="container_menu p-3 rounded">
                <div className="bg-white p-3 rounded">
                    <div className="d-flex ">
                        <Link to="/">
                            <button className="btn btn-primary btn-sm" size="sm">
                                <NavigateBeforeOutlined /> Volver
                            </button>
                        </Link>
                    </div>
                    <hr className="m-0 mt-3" />
                    <h3 className="col-12 text-center p-3 m-0 fs-4">Logs de Actividad</h3>
                    {actividad.loading && <div className='d-flex justify-content-center'>
                        <div className='spinner-border text-primary' role='status'>
                        </div>
                    </div>}
                    {actividad.data &&
                        <Table data={dataTable(actividad.data, setOpen, setData)}></Table>
                    }
                    <Modal
                    show={open}
                    setShow={setOpen}
                    size={'md'}
                    title={()=>{return 'Atributos'}}
                    >
                        {data && data.old && 
                            <div className="p-3 rounded-2 env-box row">
                            <pre>
                              <code className="language-plaintext">
                                {Object.entries(data.old).map((envVar, i) => {
                                  return (
                                    <p key={i}>
                                      <span className="var-name">{envVar[0]}=</span>
                                      <span className="var-content text-wrap">{envVar[1]}</span>
                                    </p>
                                  );
                                })}
                              </code>
                            </pre>
                          </div>
                        }
                        {data && data.attributes && 
                                <div className="p-3 rounded-2 env-box row">
                                <pre>
                                  <code className="language-plaintext">
                                    {Object.entries(data.attributes).map((envVar, i) => {
                                      return (
                                        <p key={i}>
                                          <span className="var-name">{envVar[0]}=</span>
                                          <span className="var-content text-wrap">{envVar[1]}</span>
                                        </p>
                                      );
                                    })}
                                  </code>
                                </pre>
                              </div>
                        }
                    </Modal>
                </div>

            </div>
        </section>
    )
}