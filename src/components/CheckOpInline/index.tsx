import React from "react";

interface CheckOpInlineProps {
  
    id: string;
    name: string;
    onChange: () => void;
    label: string;
    checked: boolean;
    disabled: boolean;
  

}


const CheckOpInline: React.FC<CheckOpInlineProps>= ({ id, name, onChange, label, checked, disabled }) => {
  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="radio"
        id={id}
        name={name}
        value={id}
        onChange={onChange}
        checked={checked}
        disabled={disabled}
      />
      <label className="form-check-label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default CheckOpInline;
