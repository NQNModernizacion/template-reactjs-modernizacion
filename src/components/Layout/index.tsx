import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Navbar } from '..';
import { isValidSession } from '../../utils/auth/sessionStorage';
import { getParams } from '../../utils/common';

interface ILayout {
  perfil: [];
}

const Layout: React.FC<ILayout> = ({ perfil }) => {
  const token: any = getParams().token;
  const nav = useNavigate();

  useEffect(() => {
    if (!isValidSession() && !token) nav('/login');
  }, []);

  if (!isValidSession()) return null;

  return (
    <>
      <Navbar data={perfil} />
      <main className='container'>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
