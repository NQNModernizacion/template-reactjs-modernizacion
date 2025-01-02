import { Link } from "react-router-dom";

const OptionMenu = ({ to, icon, title }) => (
  <Link to={to} className="btn btn-primary col-12 text-center mb-3 d-flex">
    {icon && icon()}
    {title}
  </Link>
);

export default OptionMenu;
