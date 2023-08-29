interface ICheckOpInline {
  id: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  checked: boolean;
  disabled?: boolean;
}

const CheckOpInline: React.FC<ICheckOpInline> = ({
  id,
  name,
  onChange,
  label,
  checked,
  disabled,
}) => {
  return (
    <div className='form-check'>
      <input
        checked={checked}
        className='form-check-input'
        disabled={disabled}
        id={id}
        name={name}
        type='radio'
        value={id}
        onChange={onChange}
      />
      <label className='form-check-label' htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default CheckOpInline;
