const UserBanner = ({ nombre }) => {
    const showMenu = () => (document.getElementById('usrOptions').style.display = 'block');

    const exitMenu = () => (document.getElementById('usrOptions').style.display = 'none');

    const returnWebLogin = () => (window.location.href = 'https://weblogin.muninqn.gov.ar');

    return (
        <div className="user-info me-3 d-flex" onMouseOver={showMenu} onMouseLeave={exitMenu}>
            <img
                className="mx-auto"
                alt="icono"
                width="32"
                src="https://weblogin.muninqn.gov.ar/apps/estilos_globales/usuario.svg"
            />
            <div className="user-label d-none my-auto ms-1 d-md-block">{nombre}</div>
            <img
                className="my-auto ms-1"
                alt="flecha"
                width="15"
                src="https://weblogin.muninqn.gov.ar/apps/estilos_globales/flecha.svg"
            />
            <div onMouseOver={showMenu} onMouseLeave={exitMenu} id="usrOptions">
                <div onClick={returnWebLogin} className="whiteButton">
                    Regresar
                </div>
            </div>
        </div>
    );
};

export default UserBanner;
