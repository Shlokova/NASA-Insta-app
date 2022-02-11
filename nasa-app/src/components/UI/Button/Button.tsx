import React from 'react';
import cl from './Button.module.css';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
}

const Button = ({ children, ...props }: ButtonProps) => {
    return (
        <button className={cl.button} {...props}>
            {children}
        </button>
    );
};

export default Button;
