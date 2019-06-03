import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "./Button.module.scss";

const COLORS = ["white", "bright", "gray", "colored"];
const SIZE = ["tiny", "small", "normal", "large"];

Button.propTypes = {
    onClick: PropTypes.func,
    color: PropTypes.oneOf(COLORS),
    size: PropTypes.oneOf(SIZE),
    rounded: PropTypes.bool,
    isUpperCase: PropTypes.bool,
    className: PropTypes.string,
    withoutPadding: PropTypes.bool,
    withoutBorder: PropTypes.bool,
    label: PropTypes.string,
    width: PropTypes.string,
    minWidth: PropTypes.string,
    height: PropTypes.string,
    children: PropTypes.array,
    style: PropTypes.object,
    underlined: PropTypes.bool,
    fullWidth: PropTypes.bool
};

Button.defaultProps = {
    rounded: true,
    isUpperCase: true,
    withoutPadding: false,
    size: "small",
    color: "white",
    style: {},
    underlined: false,
    active: false,
    withoutBorder: false,
    fullWidth: false
};

export default function Button(props) {
    const {
        onClick,
        color,
        rounded,
        label,
        className,
        size,
        isUpperCase,
        active,
        children,
        width,
        minWidth,
        style,
        withoutPadding,
        withoutBorder,
        fullWidth,
        underlined,
        height,
        fontSize,
        ...restProps
    } = props;

    const mainClassName = classnames(
        styles.main,
        styles[color],
        rounded && styles.rounded,
        withoutPadding && styles.withoutPadding,
        isUpperCase && styles.isUpperCase,
        withoutBorder && styles.withoutBorder,
        fullWidth && styles.fullWidth,
        underlined && styles.underlined,
        active && styles.active,
        styles[`s_${size}`],
        className
    );

    return (
        <button
            className={mainClassName}
            onClick={onClick}
            style={{ width, height, minWidth, ...style }}
            {...restProps}
        >
            <span>{label || children}</span>
            {underlined && <div className={styles.line} />}
        </button>
    );
}
