import React, { useState } from "react";

const FormInput = (props) => {
    const { label, errorMessage, onChange, id, value, pattern, className, ...inputProps } = props;

    const [touched, setTouched] = useState(false);

    const isValid = pattern ? new RegExp(pattern).test(value) : true;

    const handleBlur = () => {
        setTouched(true);
    };

    return (
        <div className={`flex flex-col ${className || 'w-96'}`}>
            <label className="mt-2 text-sm text-gray-400">{label}</label>
            <input
                className={`p-2 rounded-md border bg-secondary ${isValid || !touched ? "border-gray-300" : "border-red-400"
                    }`}
                {...inputProps}
                value={value}

                onChange={onChange}
                onBlur={handleBlur}
            />
            {isValid || !touched ? null : <span className="text-red-500">{errorMessage}</span>}
        </div>
    );
};

export default FormInput;
