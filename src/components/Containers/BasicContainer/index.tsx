/* import { NavigateBeforeOutlined } from "@mui/icons-material" */
import React from "react"
/* import { Link } from "react-router-dom" */

type RFC = React.FC<{
    children: React.ReactNode
    titulo?: string
}>

const BasicContainer: RFC = ({ children, titulo /* , linkBack  */ }) => {
    return (
        <section className='col-12 mx-auto mb-5 px-1'>
            <div className='container_menu p-3 rounded'>
                <div className='bg-white p-3 rounded'>
                    <div className='d-flex '>
                        {/* <Link to={linkBack} className='btn btn-primary btn-sm'>
                            <NavigateBeforeOutlined /> Volver
                        </Link> */}
                    </div>
                    {/* <hr className='m-0 mt-3' /> */}
                    {titulo && (
                        <h3 className='col-12 text-center p-3 m-0 fs-4'>
                            {titulo}
                        </h3>
                    )}

                    {children}
                </div>
            </div>
        </section>
    )
}

export default BasicContainer
