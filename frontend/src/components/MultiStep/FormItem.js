import { useState } from 'react';
import { FormLabel, FormInput, FormSelect, FormInfo } from "../Auth/AuthElements";

export const FormItem = ({ item, onChange, answer }) => {
    const [currentValue, setCurrentValue] = useState(answer || null);

    switch(item.type) {
        case 'text':
            return (
                <>
                    <FormLabel>{item.label}</FormLabel>
                    <FormInput 
                        type="text" 
                        id={item.label}
                        onChange={(e) => onChange(e.target.value, item.value)}
                        value={currentValue}
                        placeholder={item.placeholder}
                    />
                </>
            )
        break;
        case 'email':
            return (
                <>
                    <FormLabel>{item.label}</FormLabel>
                    <FormInput 
                        type="email" 
                        id={item.label}
                        onChange={(e) => onChange(e.target.value, item.value)}
                        value={currentValue}
                        placeholder={item.placeholder}
                    />
                </>
            )
        break;
        case 'select':
            return (
                <>
                    <FormLabel>{item.label}</FormLabel>
                    <FormSelect aria-label={item.label} 
                        onChange={(e) => onChange(e.target.value, item.value)}                         
                        value={currentValue}
                    >
                        <option>{item.label}</option>
                        {
                            item.options.map((opt, index) => {
                                return (
                                    <option value={opt}>{opt}</option>
                                )
                            })
                        }
                    </FormSelect>
                </>
            )
        break;
        case 'password':
            return (
                <>
                    <FormLabel>{item.label}</FormLabel>
                    <FormInput 
                        type="password" 
                        id={item.label}
                        onChange={(e) => onChange(e.target.value, item.value)}
                        value={currentValue}
                    />
                </>
            )
        break;
        case 'info':
            return (
                <>
                    <FormInfo>{item.label}</FormInfo>
                </>
            )
        break;
    }
    return (
        <></>
    )
}

