export function fieldProps(
    fieldKey,
    type,
    { fields, setFields, errors = {}, setTouched = () => {} }
) {
    return {
        value: fields[fieldKey],
        error: errors[fieldKey],
        type,
        name: fieldKey,
        onChange: fieldChangeHandler(fieldKey, {
            fields,
            setFields,
            setTouched
        })
    };
}

function fieldChangeHandler(fieldKey, { fields, setFields, setTouched }) {
    return ({ target: { value } }) => {
        setFields({
            ...fields,
            [fieldKey]: value
        });
        setTouched(true);
    };
}

export function checkBoxFieldProps(
    fieldKey,
    { fields, setFields, errors = {}, setTouched = () => {} }
) {
    return {
        value: fields[fieldKey],
        error: errors[fieldKey],
        onChange: checkBoxFieldChangeHandler(fieldKey, {
            fields,
            setFields,
            setTouched
        })
    };
}

function checkBoxFieldChangeHandler(
    fieldKey,
    { fields, setFields, setTouched }
) {
    return ({ target: { checked } }) => {
        setFields({
            ...fields,
            [fieldKey]: checked
        });
        setTouched(true);
    };
}
