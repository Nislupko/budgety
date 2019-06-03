import React, { useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import styles from "./Links.module.scss";
import t from '../../../Helpers/texts/getText';
import {ContentContext} from "../../../Context/ContentContext";

Links.propTypes = {
    links: PropTypes.array.isRequired,
    className: PropTypes.string,
    prefix: PropTypes.string,
    type: PropTypes.oneOf(["cross", "underline"])
};

Links.defaultProps = {
    type: "underline",
    prefix: null
};

export default function Links(props) {
    const { links, className, prefix, type } = props;
    const {language} = useContext(ContentContext);
    const [showLine, setShowLine] = useState(false);

    useEffect(() => setShowLine(true), []);
    return (
        <div className={classnames(styles.links, className)}>
            {links.map((link, index) => {
                return (
                    <NavLink
                        to={`/${link}`}
                        key={index}
                        className={classnames(styles.link, styles[type])}
                        activeClassName={showLine ? styles.activeLink : ""}
                    >
                        <span>{
                            prefix
                                ? t(language,`${prefix}.${link}`)
                                : link
                        }
                        </span>

                        <div className={styles.line} />
                    </NavLink>
                );
            })}
        </div>
    );
}
