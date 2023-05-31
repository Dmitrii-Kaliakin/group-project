import { createPortal } from 'react-dom';
import cn from 'classnames';
import './styles.css';

export const Modal = ({ children, isOpen, onClose }) => {


  const renderContent = () => {

    if (!isOpen) {
      return null;
    }

    return <div 
                className={cn('modal', { 'modal-active': isOpen })}
                onMouseDown={onClose}>
      <div className={cn('modal__content', { 'modal__content-active': isOpen })}
           onMouseDown={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>;
  };

  return createPortal(renderContent(), document.getElementById('modal-root'));
};