import React, { useState } from 'react';
import Button from './UI/Button/Button';
import Input from './UI/Input/Input';
interface DateFormProps {
    dateSelect: (data: string) => void;
    initialDate: string;
}
const DateForm: React.FC<DateFormProps> = ({ dateSelect, initialDate }) => {
    const [startDate, setStartDate] = useState<string>(initialDate);
    const dateNow = new Date();
    return (
        <div className="date-form">
            <Input
                type="date"
                value={startDate}
                min="1995-06-16"
                max={dateNow.toISOString().slice(0, 10)}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setStartDate(e.target.value)
                }
            />

            <Button
                onClick={(e: React.MouseEvent) => {
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
