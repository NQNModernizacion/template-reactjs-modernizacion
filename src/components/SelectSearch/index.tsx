import Select from 'react-select';

import makeAnimated from 'react-select/animated';

interface ISelectSearch {
  label: string;
  isMulti: boolean;
  value: string;
  defaultValue: string;
  options: [];
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  disabled?: boolean;
}

const SelectSearch: React.FC<ISelectSearch> = ({
  label,
  isMulti,
  value,
  defaultValue,
  options,
  onChange,
  disabled,
}) => {
  const animatedComponents = makeAnimated();

  return (
    <div className='mb-3'>
      <label className='form-label'>{label}</label>

      <Select
        isMulti
        components={animatedComponents}
        defaultValue={defaultValue}
        isDisabled={disabled}
        options={options}
        onChange={onChange}
      />
    </div>
  );
};

export default SelectSearch;
