import Select from 'react-select';

import makeAnimated from 'react-select/animated';

const SelectSearch = ({ label, isMulti, value, defaultValue, options, onChange, disabled }) => {
    const animatedComponents = makeAnimated();
    return (
        <div className="mb-3">
            <label className="form-label">{label}</label>

            <Select
                isDisabled={disabled}
                defaultValue={defaultValue}
                isMulti
                components={animatedComponents}
                options={options}
                onChange={onChange}
            />
        </div>
    );
};

export default SelectSearch;
