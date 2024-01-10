import { Link } from "react-router-dom"
import { NavigateBeforeOutlined } from '@mui/icons-material';


const Container = ({ children, titulo, linkBack, setModal, type }) => {

    return (
        <section className="col-12 col-md-10 col-xl-10 mx-auto mb-5">
            <div className="container_menu p-3 rounded">
                <div className="bg-white p-3 rounded">
                    <div className="d-flex ">
                        <Link to={linkBack}>
                            <button className="btn btn-primary btn-sm" size="sm">
                                <NavigateBeforeOutlined /> Volver
                            </button>
                        </Link>
                    </div>
                    <hr className="m-0 mt-3" />
                    <h3 className="col-12 text-center p-3 m-0 fs-4">{titulo}</h3>
                    {children}

                </div>

            </div>
        </section>
    )
}

export default Container;