const Card = ({ title, children, style }) => {
  return (
    <div className="card p-0 shadow" style={style}>
      {title && <div className="card-header">{title()}</div>}
      <div className="card-body">{children}</div>
    </div>
  );
};

export default Card;
