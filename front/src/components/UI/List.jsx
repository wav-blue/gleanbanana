const List = ({ type, children }) => {
  return <div className={`list ${type}`}>{children}</div>;
};

export default List;
