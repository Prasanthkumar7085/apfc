import { FormField, formFields } from '@/lib/constants/addDevicesConstants';
import React, { useState } from 'react';
import styles from './Level1Component.module.css';

const renderField = (field: FormField, handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void) => {
    switch (field.type) {
        case 'text':
        case 'password':
        case 'number':
            return <input type={field.type} min={field.min} max={field.max} className={styles.input} onChange={handleChange} name={field.name} />;
        case 'select':
            return (
                <select className={styles.select} onChange={handleChange} name={field.name}>
                    {field.options?.map(option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            );
        case 'radio':
            return (
                <div className={styles.radioGroup}>
                    {field.options?.map(option => (
                        <label key={option}>
                            <input type="radio" name={field.name} value={option} onChange={handleChange} />
                            {option}
                        </label>
                    ))}
                </div>
            );
        default:
            return null;
    }
};

const FormSection = ({ title, fields, handleChange }: { title: string; fields: FormField[]; handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void }) => (
    <div className={styles.formSection}>
        <h3>{title}</h3>
        {fields.map(field => (
            <div key={field.label} className={styles.fieldGroup}>
                <label className={styles.label}>{field.label}</label>
                {renderField(field, handleChange)}
            </div>
        ))}
    </div>
);

const Level1Component = () => {
    const [formData, setFormData] = useState<{ [key: string]: string | number }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <form className={styles.form}>
            {Object.entries(formFields).map(([section, fields]) => (
                <FormSection key={section} title={section} fields={fields} handleChange={handleChange} />
            ))}
            <div className={styles.buttonGroup}>
                <button type="button" className={`${styles.button} ${styles.cancelButton}`}>Cancel</button>
                <button type="submit" className={styles.button}>Save & Continue</button>
            </div>
        </form>
    );
};

export default Level1Component;
