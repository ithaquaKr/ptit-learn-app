// import { Link, useLocation } from "react-router-dom";
import { useRef, useState } from "react";
import axios from "axios";
import "./account.scss";

import LockIcon from '@mui/icons-material/Lock';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

// import { useContext, useEffect } from "react";
// import { AuthContext } from "../../context/authContext/AuthContext";


export default function Account() {

  const name = JSON.parse(window.localStorage.getItem('user')).username;
  const mail = JSON.parse(window.localStorage.getItem('user')).email;
  const Id = JSON.parse(window.localStorage.getItem('user'))._id;
  // const avatar = JSON.parse(window.localStorage.getItem('user')).avatar;
  // const [oldpassword, setOldpassword] = useState("");
  const [password, setPassword] = useState("");

  // const oldpasswordRef = useRef();
  const passwordRef = useRef();
  const [alert, setAlert] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // setOldpassword(oldpasswordRef.current.value);
    setPassword(passwordRef.current.value);
    setAlert(false);
    try {
      await axios.put(`users/${Id}`,{ password },{  
        headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      }});
      // history.push("/login");
    } catch (err) {
      setAlert(true);
    }
  };

  return (
    <div className="account">
      <div className="account-container">
      <div className="accountTitleContainer">
        <h1 className="accountTitle">ACCOUNT SETTING</h1>
      </div>
      <div className="accountTop">
          <img src="images/default-ava.png" alt="" className="accountInfoImg" />
          <div className="accountInfo">
            <div className="accountInfoItem">
              <span>name: {name}</span>
            </div>
            <div className="accountInfoItem">
              <span>email: {mail}</span>
            </div>
            <div className="accountInfoItem">
              <span>about: Something .... ?
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                Perspiciatis fuga totam est nesciunt. 
              </span>
            </div>
        </div>
      </div>
      <div className="accountBottom">
        <div className="accountBottomTitle">
          <span>Change Password</span>
        </div>
        <div className="account-input-field">
          <LockIcon className="account-icon"/>
          <input type="password" placeholder="Old Password"/>
        </div>
        <div className="account-input-field">
          <LockIcon className="account-icon"/>
          <input type="password" placeholder="New Password" ref={passwordRef}/>
        </div>
        <button className="account-update-btn" onClick={handleSubmit}>
          Update
          </button>
          {alert &&  
          <Stack sx={{ width: '45%' }}>
            <Alert severity="error">Something Wrong?!</Alert>
          </Stack>}
        </div>
      </div>
    </div>
  );
}
