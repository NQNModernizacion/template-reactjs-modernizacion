const Select = ({ id, label, value, defaultValue, options, onChange, disabledSelect }) => {
  return (
    <div className="mb-3">
      <label className="form-label" id={"label-" + id}>
        {label}
      </label>
      <select
        id={id}
        className="form-select"
        value={value}
        onChange={onChange}
        disabled={disabledSelect}
      >
        <option disabled value={"DEFAULT"}>
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
