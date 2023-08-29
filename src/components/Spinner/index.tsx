interface ISpinner {
  color: string;
  margin: string;
  size: string;
  loc?: string;
}

const Spinner: React.FC<ISpinner> = ({ color, margin, size, loc = 'center' }) => {
  const classname = 'd-flex justify-content-' + loc;

  return (
    <div className={classname}>
      <div
        className='spinner-grow'
        role='status'
        style={{ color, margin, width: size, height: size }}
      >
        <span className='visually-hidden'>Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
