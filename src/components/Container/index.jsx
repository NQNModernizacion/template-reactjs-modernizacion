import { Link } from 'react-router-dom'

const Container = ({ children, titulo, linkBack, setModal, type }) => {
  return (
    <section className='container_menu p-3 rounded'>
      <div className='bg-body container p-3 rounded'>
        <div className='bg-white p-3 rounded'>
          <div className='d-flex '>
            <Link to={linkBack}>
              <button className='btn btn-primary'>
                <i className='fas fa-arrow-left' /> Volver
              </button>
            </Link>
          </div>
          <hr className='m-0 mt-3' />
          <h3 className='col-12 text-center p-3 m-0 fs-4'>{titulo}</h3>
          {children}
        </div>
      </div>
    </section>
  )
}

export default Container
