interface ISelect {
  id: string;
  label: string;
  value: string;
  defaultValue: string;
  options: [];
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  disabledSelect?: boolean;
}

const Select: React.FC<ISelect> = ({
  id,
  label,
  value,
  defaultValue,
  options,
  onChange,
  disabledSelect,
}) => {
  return (
    <div className='mb-3'>
      <label className='form-label' id={'label-' + id}>
        {label}
      </label>
      <select
        className='form-select'
        disabled={disabledSelect}
        id={id}
        value={value}
        onChange={onChange}
      >
        <option disabled value={'DEFAULT'}>
          {defaultValue}
        </option>
        {Object.entries(options).map((op, key) => (
          <option key={key} value={op[0]}>
            {op[1]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
