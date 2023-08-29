interface IInput {
  id: string;
  label: string;
  type: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  min?: number;
  value: string;
  accept?: string;
  disabled?: boolean;
  rows?: number;
}

const Input: React.FC<IInput> = ({
  id,
  label,
  type,
  onChange,
  min,
  value,
  accept,
  disabled,
  rows,
}) => {
  if (type === 'textarea') {
    return (
      <div className='mb-3'>
        <label className='form-label' htmlFor={id} id={'label-' + id}>
          {label}
        </label>
        <textarea
          className='form-control'
          disabled={disabled}
          id={id}
          rows={rows}
          style={{ resize: 'none', overflow: 'scroll' }}
          value={value}
          onChange={onChange}
        />
      </div>
    );
  }

  return (
    <div className='mb-3'>
      <label className='form-label' htmlFor={id} id={'label-' + id}>
        {label}
      </label>
      <input
        accept={accept}
        className='form-control'
        disabled={disabled}
        id={id}
        min={min}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
