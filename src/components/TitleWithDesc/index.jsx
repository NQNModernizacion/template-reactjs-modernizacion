const TitleWithDesc = ({ id, role, title, desc, onClick, br, color }) => {
  const colorLabel = color ? color : "c-b";
  return (
    <>
      <span className="font-weight-normal">
        <strong
          className={"font-weight-normal " + colorLabel}
          role={role}
          id={id}
          onClick={onClick}
        >
          {title}
        </strong>
        <span>{desc}</span>
      </span>
      {br && <br />}
    </>
  );
};

export default TitleWithDesc;
