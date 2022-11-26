import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./navbar.module.scss";

import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import MenuIcon from "@material-ui/icons/Menu";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { auth, profile } = useSelector((state) => {
    return {
      auth: state.firebase.auth,
      profile: state.firebase.profile,
    };
  });
  const links = auth.uid ? (
    <SignedInLinks profile={profile} />
  ) : (
    <SignedOutLinks />
  );

  return (
    <nav className={styles.navbarContainer}>
      <div className={`container ${styles.navbar}`}>
        <div className={styles.navbarLogo}>
          <Link to="/">
            <h1>Pokemon</h1>
          </Link>
          <div
            className={styles.hamburgerMenu}
            onClick={() => setShowMenu(!showMenu)}
          >
            <MenuIcon />
          </div>
        </div>
        <div
          className={`${styles.navbarMenu}${
            showMenu ? " " + styles.showMenu : ""
          }`}
        >
          {links}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
