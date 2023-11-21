const Input = (props) => {
  const { type = "text", className } = props;
  return <input className={`${className} input`} type={type} />;
};

export default Input;
