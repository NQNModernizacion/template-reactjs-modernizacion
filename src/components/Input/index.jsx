const Input = ({ id, label, type, onChange, min, value, accept, disabled, rows }) => {
  if (type === "textarea") {
    return (
      <div className="mb-3">
        <label htmlFor={id} id={"label-" + id} className="form-label">
          {label}
        </label>
        <textarea
          className="form-control"
          id={id}
          onChange={onChange}
          rows={rows}
          disabled={disabled}
          value={value}
          style={{ resize: "none", overflow: "scroll" }}
        ></textarea>
      </div>
    );
  }

  return (
    <div className="mb-3">
      <label htmlFor={id} id={"label-" + id} className="form-label">
        {label}
      </label>
      <input
        type={type}
        className="form-control"
        id={id}
        onChange={onChange}
        min={min}
        value={value}
        accept={accept}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
