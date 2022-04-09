//Import Icon
import { ArrowDropDown, Notifications } from "@mui/icons-material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

import { useContext, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import { logout } from "../../authContext/AuthActions";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { dispatch } = useContext(AuthContext);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  return (
    <>
    <link rel="stylesheet" href="navbar.scss"></link>
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container_navbar">
        <div className="left">
          <img
            src="/images/logo.png"
            alt=""
          />
          <Link to="/" className="link">
            <span>Homepage</span>
          </Link>
          <Link to="/series" className="link">
            <span className="navbarmainLinks">Series</span>
          </Link>
          <Link to="/movies" className="link">
            <span className="navbarmainLinks">Movies</span>
          </Link>
        </div>
        <div className="right">
          <div className="search">
            <input type="text" placeholder="Search..." />
            <SearchOutlinedIcon />
          </div>
          <Notifications className="icon" />
          <img
            src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
          />
          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <span>
              <AccountCircleOutlinedIcon className="icon-drop" />
                < Link to="/account" className="link">
                  Account
                </Link>
              </span>
              
              <span>
                <SettingsApplicationsIcon className="icon-drop" />
                Settings
              </span>
              
              <span onClick={() => dispatch(logout())}>
              <ExitToAppIcon className="icon-drop" />
                Logout
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Navbar;
