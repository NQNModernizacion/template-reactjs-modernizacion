import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components";
import { APP_NAME } from "../../config";
import { UserContext } from "../../context";
import { isValidSession } from "../../utils/sessionStorage";
import { handleLogin } from "./handlers";

const Login = () => {
  const { actions: ua, loading } = useContext(UserContext);

  const [form, setForm] = useState({ email: "", password: "", app_name: APP_NAME });

  const nav = useNavigate();

  useEffect(() => {
    ua.setLoading(false);
    if (isValidSession()) nav("/");
  }, []);

  const login = (e) => handleLogin(e, ua, form, nav);

  return (
    <div className="container pt-5">
      <div className="offset-md-3 col-md-6 offset-sm-1 col-sm-10 bg-body rounded p-2 my-auto">
        <form onSubmit={login} className="p-4">
          <h3>Ingresar al sistema</h3>
          <hr />
          <Input
            label="Correo Electronico"
            id="email"
            name="email"
            value={form.email}
            placeholder="usuario@correo.com"
            onChange={(e) => setForm({ ...form, email: e.currentTarget.value })}
          />
          <Input
            label="Contraseña"
            id="password"
            name="password"
            type="password"
            value={form.password}
            placeholder="********"
            onChange={(e) => setForm({ ...form, password: e.currentTarget.value })}
          />
          <div className="d-flex justify-content-center mt-3">
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
