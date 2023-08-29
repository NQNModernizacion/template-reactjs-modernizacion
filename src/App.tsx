import { useContext, useEffect } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components';
import { UserContext } from './context';
import { initApp, showSpinner } from './handlers';
import { Login, Menu } from './screens';

const App = () => {
  const { actions, loading } = useContext(UserContext);

  useEffect(() => {
    initApp(actions);
  }, []);

  showSpinner(loading);

  const NotFound = () => 404;

  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout perfil={actions.getPerfil()} />}>
          <Route element={<Menu />} path='/' />

          <Route element={<NotFound />} path='*' />
        </Route>
        <Route element={<Login />} path='/login' />
      </Routes>
    </HashRouter>
  );
};

export default App;
