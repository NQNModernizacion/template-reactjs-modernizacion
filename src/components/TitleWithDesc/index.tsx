interface ITitleWithDesc {
  id?: string;
  role?: string;
  title: string;
  desc: string;
  onClick?: () => void;
  br?: boolean;
  color?: string;
}

const TitleWithDesc: React.FC<ITitleWithDesc> = ({ id, role, title, desc, onClick, br, color }) => {
  const colorLabel = color ? color : 'c-b';

  return (
    <>
      <span className='font-weight-normal'>
        <strong
          className={'font-weight-normal ' + colorLabel}
          id={id}
          role={role}
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
