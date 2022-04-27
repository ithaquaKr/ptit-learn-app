// export default Sidebar;
import "./sidebar.scss";

//Import Icon
import DashboardIcon from "@mui/icons-material/Dashboard";
// import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
// import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// import CreditCardIcon from "@mui/icons-material/CreditCard";
// import StoreIcon from "@mui/icons-material/Store";
// import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
// import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
// import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchIcon from '@mui/icons-material/Search';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';

import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/authContext/AuthContext";
import { logout } from "../../context/authContext/AuthActions";


const Sidebar = () => {
  const {dispatch } = useContext(AuthContext);
  const name = JSON.parse(window.localStorage.getItem('user')).username;
  const mail = JSON.parse(window.localStorage.getItem('user')).email;
  const avatar = JSON.parse(window.localStorage.getItem('user')).avatar;
  // useEffect(() => {
  //   const script = document.createElement('script');
  //   script.src = "/script.js";
  //   script.async = true;
  //   document.body.appendChild(script);
  //   return () => {
  //     document.body.removeChild(script);
  //   }
  // }, []);
  useEffect(() => {
    let sidebar = document.querySelector(".sidebar");
    let closeBtn = document.querySelector("#btn");
    let searchBtn = document.querySelector(".bx-search");

    closeBtn?.addEventListener("click", ()=>{
      sidebar.classList.toggle("open");
      menuBtnChange();//calling the function(optional)
    });


    searchBtn?.addEventListener("click", ()=>{ // Sidebar open when you click on the search iocn
        sidebar.classList.toggle("open");
        menuBtnChange(); //calling the function(optional)
    });
      
    // following are the code to change sidebar button(optional)
    function menuBtnChange() {
    if(sidebar.classList.contains("open")){
      closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");//replacing the iocns class
    }else {
      closeBtn.classList.replace("bx-menu-alt-right","bx-menu");//replacing the iocns class
    }
    }
  });

  return (
    <>
    <div className="sidebar">
    <div className="logo-details">
        <img src="/images/whatlogo.png" alt="" />
          <Link to="/home" style={{ textDecoration: "none" }} className = "logo_name">
            <div className="logo_name">AMILab</div>
          </Link>
        <i className='bx bx-menu' id="btn"></i>
    </div>
    <ul className="nav-list">
      <li>
          <i className='bx-search' ><SearchIcon className="bx-search-icon"/></i>
         <input type="text" placeholder="Search..."></input>
         <span className="tooltip">Search</span>
      </li>
      <li>
        {/* <a href="# ">  */}
          <Link to="/home" style={{ textDecoration: "none" }}>
            <i><DashboardIcon className="icon"/></i>
            <span className="links_name">Dashboard</span>
          </Link>
        {/* </a> */}
         <span className="tooltip">Dashboard</span>
      </li>
      <li>
       {/* <a href="# "> */}
        <Link to="/mydocuments" style={{ textDecoration: "none" }}>
         <i><AccountCircleOutlinedIcon className="icon"/></i>
         <span className="links_name">My Documents</span>
        </Link>
       {/* </a> */}
       <span className="tooltip">My Documents</span>
     </li>
     <li>
       {/* <a href="# "> */}
         <Link to="/library" style={{ textDecoration: "none" }}>
          <i><LocalLibraryIcon className="icon"/></i>
          <span className="links_name">Library</span>
        </Link>
       {/* </a> */}
       <span className="tooltip">Library</span>
     </li>
     <li>
       <a href="# ">
         <i className='bx bx-pie-chart-alt-2' ></i>
         <span className="links_name">Analytics</span>
       </a>
       <span className="tooltip">Analytics</span>
     </li>
     <li>
       <a href="# ">
         <i className='bx bx-folder' ></i>
         <span className="links_name">File Manager</span>
       </a>
       <span className="tooltip">Files</span>
     </li>
     <li>
       <a href="# ">
         <i className='bx bx-cart-alt' ></i>
         <span className="links_name">Order</span>
       </a>
       <span className="tooltip">Order</span>
     </li>
     <li>
       <a href="# ">
         <i className='bx bx-heart' ></i>
         <span className="links_name">Saved</span>
       </a>
       <span className="tooltip">Saved</span>
     </li>
     <li>
       <Link to="/account" style={{ textDecoration: "none" }}>
         <i><SettingsIcon className="icon"/></i>
         <span className="links_name">Setting</span>
        </Link>
       <span className="tooltip">Setting</span>
     </li>
     <li className="profile">
         <div className="profile-details">
           <img src="images/default-ava.png" alt="profileImg"></img>
           <div className="name_job">
             <div className="name">{name}</div>
             <div className="mail">{mail}</div>
           </div>
         <Link to="/">
         <i id="log_out" >
           <ExitToAppIcon onClick = { () => dispatch(logout())}/>
         </i>
        </Link>  
         </div>
     </li>
    </ul>
  </div>
  </>
  );
};

export default Sidebar;
