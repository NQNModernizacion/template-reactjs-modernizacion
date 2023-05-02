import React from "react";

const LinkButtons = () => {
  return (
    <>
      <div className="d-flex">
        <Link to="/" className="btn btn-primary me-2">
          Home
        </Link>
        <Link to="/uno" className="btn btn-primary me-2">
          uno
        </Link>
        <Link to="/dos" className="btn btn-primary me-2">
          DOS
        </Link>
        <Link to="/tres/1" className="btn btn-primary me-2">
          TRES/1
        </Link>
        <Link to="/cuatro" className="btn btn-primary me-2">
          RUTA S/ BOTONES
        </Link>
        <Link to="/cinco" className="btn btn-primary me-2">
          RUTA S/ LAYOUT
        </Link>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default LinkButtons;
