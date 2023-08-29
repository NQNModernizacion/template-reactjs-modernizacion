interface ISmall {
  msg: string;
  type: string;
  classname?: string;
}

const Small: React.FC<ISmall> = ({ msg, type, classname }) => {
  let color = 'red';

  if (type === 'success') color = 'green';
  if (type === 'info') color = 'blue';

  const style = {
    color,
  };

  return (
    <small className={classname} style={style}>
      {msg}
    </small>
  );
};

export default Small;
