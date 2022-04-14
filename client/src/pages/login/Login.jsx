import { useContext, useState } from "react";
import { login } from "../../context/authContext/apiCalls";
import { AuthContext } from "../../context/authContext/AuthContext";
import { Link } from "react-router-dom";
import PasswordIcon from '@mui/icons-material/Password';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "./login.scss";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
      login({ username, password }, dispatch);
  };
  
  return (
    <>
      <div className="container">
        <div className="forms-container">
          <div className="signin-signup">
            <form className="sign-in-form">
              <h2 className="title">Đăng nhập</h2>
              <div className="input-field">
                <AccountCircleIcon className="icon"/>
                <input type="text" placeholder="Tên đăng nhập" onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="input-field">
                <PasswordIcon className="icon"/>
                <input type="password" placeholder="Mật khẩu" onChange={(e) => setPassword(e.target.value)} />
              </div>
              <input type="submit" value="Đăng nhập" className="btn solid" onClick={handleLogin} />
            </form>
          </div>
        </div>
      </div>
      <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>Chưa có tài khoản?</h3>
              <p>
                Vậy thì còn chần chờ gì nữa mà không đăng ký ngay để có những trải nghiệm tuyệt vời cùng PTIT Learn
              </p>
              <Link to="/register" className="link" >
                <button className="btn transparent" id="sign-up-btn" >
                  Đăng kí ngay
                </button>
              </Link>  
            </div>
            <img src="/images/bg-login.svg" className="image" alt="" />
          </div>
        </div>
    </>
  );
}
