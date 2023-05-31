import { forwardRef } from 'react';
import cn from 'classnames';
import s from './styles.module.css';

export const FormInput = forwardRef(({ typeTag, ...props }, ref) => {
  return (
    typeTag === 'textarea'
      ? <textarea ref={ref} className={cn(s.input, s.textarea)} {...props} />
      : <input ref={ref} className={s.input}  {...props} />
  );
});
