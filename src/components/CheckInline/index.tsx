interface ICheckInline {
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  checked: boolean;
  disabled?: boolean;
}

const CheckInline: React.FC<ICheckInline> = ({ id, value, onChange, label, checked, disabled }) => {
  return (
    <>
      <div className='form-check'>
        <input
          checked={checked}
          className='form-check-input'
          disabled={disabled}
          id={id}
          type='checkbox'
          value={value}
          onChange={onChange}
        />
        <label className='form-check-label' htmlFor={id}>
          {label}
        </label>
      </div>
    </>
  );
};

export default CheckInline;
