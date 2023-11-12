import React, { ReactNode, useEffect, useRef } from "react";

interface InputWithLabelProps {
    inputId: string;
    inputValue: string;
    isFocused: boolean;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    children: ReactNode;
}

const InputWithLabel: React.FC<InputWithLabelProps> = ({
    inputId,
    inputValue,
    isFocused,
    onInputChange,
    children
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    
    useEffect(() => {
        if (isFocused && inputRef.current) {
            inputRef.current.focus();
        }
    });
    
    return (
        <>
            <label htmlFor={inputId}>{children}</label>
            &nbsp;
            <input
                id={inputId}
                ref={inputRef}
                value={inputValue}
                onChange={onInputChange}/>
        </>
    );
};

export default InputWithLabel;