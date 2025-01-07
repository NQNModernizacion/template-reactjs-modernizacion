interface CheckInlineProps {
  id: string;
  value: string;
  onChange: () => void;
  label: string;
  checked: boolean;
  disabled: boolean;
}
const CheckInline: React.FC<CheckInlineProps> = ({ id, value, onChange, label, checked, disabled }) => {
  return (
    <>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value={value}
          id={id}
          onChange={onChange}
          checked={checked}
          disabled={disabled}
        />
        <label className="form-check-label" htmlFor={id}>
          {label}
        </label>
      </div>
    </>
  );
};

export default CheckInline;
