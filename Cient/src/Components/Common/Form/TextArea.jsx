import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "./TextArea.module.scss";
import TextArea from "react-textarea-autosize";

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
    onChange: PropTypes.func.isRequired
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
    controlled: false
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
        controlled
    } = props;
    const inputProperties = {
        id: name,
        name,
        type,
        maxLength: max,
        placeholder: label,
        onChange,
        className: styles.input,
        ...lastProps
    };

    if (controlled) {
        inputProperties.value = value;
    } else {
        inputProperties.defaultValue = value;
    }

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
            <span className={styles.labelOuter}>{label}</span>
            <label htmlFor={name} className={styles.inputContainer}>
                <TextArea className={styles.input} {...inputProperties} />
                <div className={styles.error}>{props.error}</div>
            </label>
        </div>
    );
}
