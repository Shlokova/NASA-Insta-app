import React from 'react';
import { useNavigate } from 'react-router-dom';
import cl from './Modal.module.css';
interface ModalProps {
    children?: React.ReactNode;
    visible: boolean;
    setVisible?: (visible: boolean) => void;
}
const Modal = ({ children, visible, setVisible }: ModalProps) => {
    const rootClasses = [cl.modal];
    const router = useNavigate();
    if (visible) {
        rootClasses.push(cl.active);
    }
    const closeModal = () => {
        if (setVisible) {
            setVisible(false);
        } else {
            router('/');
        }
    };
    return (
        <div className={rootClasses.join(' ')} onClick={closeModal}>
            <div
                className={cl.modalContent}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

export default Modal;
