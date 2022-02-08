import React, { useState } from 'react';
import Button from './UI/Button/Button';
import Input from './UI/Input/Input';

const DateForm = ({ dateSelect }) => {
    const [startDate, setStartDate] = useState('1995-06-16');
    const dateNow = new Date();
    return (
        <div className="date-form">
            <Input
                type="date"
                value={startDate}
                min="1995-06-16"
                max={dateNow.toISOString().slice(0, 10)}
                onChange={(e) => setStartDate(e.target.value)}
            />

            <Button
                onClick={(e) => {
                    e.preventDefault();
                    dateSelect(startDate);
                }}
            >
                Выбрать
            </Button>
        </div>
    );
};

export default DateForm;
