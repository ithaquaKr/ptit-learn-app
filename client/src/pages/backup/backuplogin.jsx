import { useContext, useState } from "react";
import { login } from "../../authContext/apiCalls";
import { AuthContext } from "../../authContext/AuthContext";
import { Link } from "react-router-dom";
import "./login.scss";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password }, dispatch);
  };
  return (
    <>
    <div className="bg-image-left">
      <img 
        src="/images/underrawframe4.png" 
        alt="" 
      />
      <div className="slogan">
        <span>Hệ thống hỗ trợ học tập PTIT</span>
      </div>
    </div>
    <div className="login">
      <div className="container">
        <form>
          <div className="wrapper">
            <img
              className="logo"
              src="/images/logo.png"
              alt=""
            />
          </div>
          <h1>Đăng nhập</h1>
          <h2>PTIT Learn</h2>
          <input
            type="email"
            placeholder="Email hoặc số điện thoại"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="loginButton" onClick={handleLogin}>
            Đăng nhập
          </button>
          <span>
            Chưa có tài khoản? 
            <Link to="/register" className="link">
              <b> Đăng kí ngay</b>
            </Link> 
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <b>Learn more</b>.
          </small>
        </form>
      </div>
    </div>

    </>
  );
}
