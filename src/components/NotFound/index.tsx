import React from 'react'

import { BasicContainer } from "../index";
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Home } from "lucide-react";


export const NotFound = () => {
  const nav = useNavigate();
  return (
    <BasicContainer titulo='404 Pagina no encontrada' >
      <div className="d-flex flex-column align-items-center">
        <div className="d-flex gap-3">
          <button
            className="btn btn-outline-primary btn-lg px-4 py-2"
            onClick={() => nav(-1)}
          >
            <ChevronLeft size={24} />
            Volver
          </button>

          <button
            className="btn btn-primary btn-lg px-4 py-2"
            onClick={() => nav("/")}
          >
            <Home size={24} />
            Ir al Home
          </button>

        </div>
      </div>
    </BasicContainer>
  )
}

export default NotFound;
