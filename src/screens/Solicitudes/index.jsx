import React from "react";
import { useParams } from "react-router-dom";

const VistaSolicitudes = () => {
  const { id } = useParams();
  return <div>Solicitud N° {id}</div>;
};

export default VistaSolicitudes;
