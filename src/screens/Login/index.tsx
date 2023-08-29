import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context';
import { handleLogin } from './handlers';
import { isValidSession } from '../../utils/auth/sessionStorage';
import { Input } from '../../components';

const Login = () => {
  const { actions: ua, loading } = useContext(UserContext);

  const [form, setForm] = useState({ email: '', password: '' });

  const nav = useNavigate();

  useEffect(() => {
    ua.setLoading(false);
    if (isValidSession()) nav('/');
  }, []);

  const login = (e) => handleLogin(e, ua, form, nav);

  return (
    <div className='container mt-5'>
      <div className='offset-md-3 col-md-6 offset-sm-1 col-sm-10 bg-body rounded p-2'>
        <form className='p-4' onSubmit={login}>
          <h3>Ingresar al sistema</h3>
          <hr />
          <Input
            id='email'
            label='Correo Electronico'
            name='email'
            placeholder='usuario@correo.com'
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.currentTarget.value })}
          />
          <Input
            id='password'
            label='Contraseña'
            name='password'
            placeholder='********'
            type='password'
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.currentTarget.value })}
          />
          <div className='d-flex justify-content-center mt-3'>
            <button className='btn btn-primary w-100' disabled={loading} type='submit'>
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
