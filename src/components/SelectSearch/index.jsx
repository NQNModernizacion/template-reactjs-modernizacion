import Select from "react-select";

import makeAnimated from "react-select/animated";

const SelectSearch = ({
  label,
  isMulti,
  value,
  defaultValue,
  options,
  onChange,
  disabled,
  placeholder,
  noData,
}) => {
  const animatedComponents = makeAnimated();
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>

      <Select
        value={value != null ? value : []}
        isDisabled={disabled}
        defaultValue={defaultValue}
        isMulti={isMulti}
        components={animatedComponents}
        options={options}
        onChange={onChange}
        placeholder={placeholder != null ? placeholder : "Buscar..."}
        noOptionsMessage={noData != null ? noData : () => "No hay datos"}        
      />
    </div>
  );
};

export default SelectSearch;
