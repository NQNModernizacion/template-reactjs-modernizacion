const OptionMenu = ({ sc, onClick, icon, title }) => (
    <div className="col-12 text-center mb-3" data-menu={sc} onClick={onClick}>
        <button className="btn btn-primary btn-menu" data-menu={sc} onClick={onClick}>
            <div className="d-flex" data-menu={sc} onClick={onClick}>
                {icon && icon()}
                {title}
            </div>
        </button>
    </div>
);

export default OptionMenu;
