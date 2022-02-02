import React from 'react';
import cl from './MyLoader.module.css';
const MyLoader = () => {
    return (
        <div className={cl.loaderContainer}>
            <div className={cl.loader}></div>
        </div>
    );
};

export default MyLoader;
