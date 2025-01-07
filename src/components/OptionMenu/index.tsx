import { Link } from "react-router-dom";

interface OptionMenuProps {
  to: string;
  icon?: () => JSX.Element;
  title: string;
}

const OptionMenu = ({ to, icon, title }: OptionMenuProps) => (
  <Link to={to} className="btn btn-primary col-12 text-center mb-3 d-flex">
    {icon && icon()}
    {title}
  </Link>
);

export default OptionMenu;
