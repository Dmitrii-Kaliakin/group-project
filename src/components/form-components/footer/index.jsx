import s from './styles.module.css';

export const FormFooter = ({ children }) => {
  return <div className={s.modal__footer}>
    {children}
  </div>;
};