import axios from "axios";
import PasswordIcon from '@mui/icons-material/Password';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import { useRef } from "react";
import { useState } from "react";
import { useHistory, 
          Link } from "react-router-dom";
import "./register.scss";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const history = useHistory();

  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();
  
  const handleFinish = async (e) => {
    e.preventDefault();
    setEmail(emailRef.current.value);
    setPassword(passwordRef.current.value);
    setUsername(usernameRef.current.value);
    try {
      await axios.post("auth/register", { email,username, password });
      history.push("/login");
    } catch (err) {}
  };
 
  return (
  <>
   <div className="container-reg">
      <div className="forms-container-reg">
        <div className="signin-signup-reg">
          <form className="sign-up-form-reg">
            <h2 className="title">Đăng kí</h2>
            <div className="input-field">
              <EmailIcon className="icon"/>
              <input type="email"  placeholder="Email" ref={emailRef} />
            </div>
            <div className="input-field">
              <AccountCircleIcon className="icon"/>
              <input type="text" placeholder="Tên đăng nhập" ref={usernameRef} />
            </div>
            <div className="input-field">
              <PasswordIcon className="icon"/>
              <input type="password" placeholder="Mật khẩu" ref={passwordRef} />
            </div>
            <input type="submit" className="btn" value="Đăng kí" onClick={handleFinish} />
          </form>
        </div>
      </div>
    </div>
    <div className="panels-container-reg">
      <div className="panel right-panel">
        <div className="content-reg">
          <h3>Đã có tài khoản?</h3>
          <p>
            Đăng nhập ngay để trải nghiệm những tính năng tuyệt vời của PTIT Learn
          </p>
          <Link to="/login" className="link" >
            <button className="btn transparent" id="sign-in-btn">
                  Đăng nhập ngay
            </button>
          </Link> 
        </div>
        <img src="/images/bg-register.svg" className="image-reg" alt=""/>
      </div>
    </div>
  </>
  );
}
