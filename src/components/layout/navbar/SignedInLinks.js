import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import styles from "./navbar.module.scss";

import { signOut } from "../../../store/actions/authActions";

const SignedInLinks = ({ profile }) => {
  const dispatch = useDispatch();

  return (
    <ul>
      <li>
        <a onClick={() => dispatch(signOut())}>Log Out</a>
      </li>
      <li>
        <NavLink
          to="/profile"
          className={styles.account}
          activeClassName={styles.isActive}
        >
          {profile.initials}
        </NavLink>
      </li>
    </ul>
  );
};

export default SignedInLinks;
