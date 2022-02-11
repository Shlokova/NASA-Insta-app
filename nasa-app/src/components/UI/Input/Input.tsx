import React from 'react';
import cl from './Input.module.css';

const Input = (props: React.HTMLProps<HTMLInputElement>) => {
    return <input className={cl.input} {...props} />;
};

export default Input;
