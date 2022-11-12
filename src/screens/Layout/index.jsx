import { HOME_SCREEN } from '../../config/types';
import UserBanner from './UserBanner';

const Layout = ({ state, children }) => {
    return (
        <>
            <nav className="navbar navbar-expand-lg d-flex justify-content-between">
                <span className="navbar-brand logo" type="button" name={HOME_SCREEN}></span>
                <UserBanner nombre={'NOMBRE'} />
            </nav>
            <div className="container">
                <div className="row pt-3 m-0">{children}</div>
            </div>
        </>
    );
};

export default Layout;
