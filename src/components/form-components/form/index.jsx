
export const Form = ({ handleFormSubmit, title, children }) => {
  return (
    <form onSubmit={handleFormSubmit}>
      {title && <h2>{title}</h2>}
      {children}
    </form>
  );
};