import React,{useRef} from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "./TextField.module.scss";

TextField.propTypes = {
    label: PropTypes.string,
    error: PropTypes.string,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    max: PropTypes.number,
    classes: PropTypes.object,
    value: PropTypes.any,
    placeholder: PropTypes.string,
    fullWidth: PropTypes.bool,
    lightMode: PropTypes.bool,
    controlled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    setInputRef: PropTypes.func
};

TextField.defaultProps = {
    label: "",
    error: "",
    placeholder: "",
    type: "text",
    value: "",
    fullWidth: false,
    classes: {},
    lightMode: false,
    controlled: false,
    setInputRef: () => {}
};

export default function TextField(props) {
    const {
        name,
        type,
        error,
        label,
        classes,
        value,
        fullWidth,
        max,
        onChange,
        lightMode,
        lastProps,
        controlled,
        setInputRef
    } = props;
    const inputProperties = {
        id: name,
        name,
        type,
        maxLength: max,
        onChange,
        className: styles.input,
        ...lastProps
    };
    const ref = useRef(null);
    if (controlled) {
        inputProperties.value = value;
    } else {
        inputProperties.defaultValue = value;
    }
    if (setInputRef) setInputRef(ref);
    return (
        <div
            className={classnames(
                styles.field,
                fullWidth && styles.fullWidth,
                lightMode && styles.lightMode,
                { [classes.root]: Boolean(classes.root) },
                { [styles.hasError]: Boolean(error) }
            )}
        >
            <label htmlFor={name} className={styles.inputContainer}>
                <input ref={ref} {...inputProperties} />
                <span className={styles.label}>{label}</span>
                <div className={styles.error}>{props.error}</div>
            </label>
        </div>
    );
}
