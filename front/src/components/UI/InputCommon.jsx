const InputCommon = (props) => {
  const { label, type = "text", id, value, className, onChange } = props;
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        className={`${className} input`}
        onChange={onChange}
      />
    </div>
  );
};

export default InputCommon;
