import "./BasicInput.scss";

const BasicInput = ({ purpose, label, value, setValue, styles = {} }) => {
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="input-group" style={styles}>
      <div htmlFor={purpose} className="label">
        {label}
      </div>
      <input
        type={purpose}
        className="input"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default BasicInput;
