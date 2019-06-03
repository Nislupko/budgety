import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import RCCheckbox from "rc-checkbox";
import styles from "./CheckBoxField.module.scss";

Checkbox.propTypes = {
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    labelOnTheRight: PropTypes.bool,
    value: PropTypes.bool,
    className: PropTypes.string,
    inputClassName: PropTypes.string,
    reverse: PropTypes.bool,
    containerStyle: PropTypes.object
};

Checkbox.defaultProps = {
    labelOnTheRight: false,
    label: "",
    classes: {},
    containerStyle: {},
    value: false,
    reverse: false
};

export default function Checkbox(props) {
    const {
        label,
        name,
        error,
        classes,
        value,
        children,
        onChange,
        className,
        reverse,
        containerStyle,
        ...restProps
    } = props;
    const { root, input, checked } = classes || {};
    return (
        <div
            style={containerStyle}
            className={classnames(
                styles.field,
                root,
                { [styles.checked]: value },
                { [classes.root]: Boolean(classes.root) },
                { [styles.hasError]: Boolean(error) }
            )}
        >
            <label htmlFor={name} className={styles.inputContainer}>
                {reverse === false && (
                    <span className={styles.label}>{label || children}</span>
                )}
                <RCCheckbox
                    id={name}
                    name={name}
                    type="checkbox"
                    className={classnames(
                        styles.input,
                        input,
                        value && checked
                    )}
                    checked={value}
                    defaultChecked={value}
                    onChange={onChange}
                    disableRipple
                    {...restProps}
                />
                {reverse === true && (
                    <span className={styles.label}>{label || children}</span>
                )}
            </label>
            <span classes={styles.error}>{error}</span>
        </div>
    );
}
