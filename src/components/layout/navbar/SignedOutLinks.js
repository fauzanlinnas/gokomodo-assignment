import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./navbar.module.scss";

const SignedOutLinks = () => {
  return (
    <ul>
      <li>
        <NavLink to="/signup" activeClassName={styles.isActive}>
          Sign Up
        </NavLink>
      </li>
      <li>
        <NavLink to="/signin" activeClassName={styles.isActive}>
          Login
        </NavLink>
      </li>
    </ul>
  );
};

export default SignedOutLinks;
