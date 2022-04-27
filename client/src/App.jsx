import "./app.scss";
import Home from "./pages/home/Home";
// import Register from "./pages/backup/register/Register";
import Read from "./pages/read/Read";
// import Login from "./pages/login/Login";
import Account from "./pages/account/Account";
import NewDocument from "./pages/newDocument/NewDocument";
import MydocumentList from "./pages/mydocumentList/MydocumentList";
import Document from "./pages/document/Document";
import Landingpage from "./pages/landingpage/Landingpage";
import Library from "./pages/library/Library";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/authContext/AuthContext";
import Sidebar from "./components/sidebar/Sidebar";
import Auth from "./pages/auth/Auth";
// import Navbar from "./components/navbar/Navbar";
const App = () => {
  const { user } = useContext(AuthContext);


  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Landingpage /> : <Redirect to="/auth" />}
        </Route>
        {/* <Route path="/register">
          {!user ? <Register /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">{!user ? <Login /> : <Redirect to="/home" />}</Route>
         */}
        <Route path="/auth">{!user ? <Auth /> : <Redirect to="/home" />}</Route>
       
        {user && (
          <>
          {/* <Navbar/> */}
          <Sidebar/>
          <div className="main-container">
            <Route path="/home">
              <Home/>
            </Route>
            <Route path="/read/:documentId">
              <Read />
            </Route>
            <Route path="/account">
              <Account />
            </Route>
            <Route path="/newDocument">
              <NewDocument />
            </Route>
            <Route path="/mydocuments">
              <MydocumentList />
            </Route>
            <Route path="/library">
              <Library />
            </Route>
            <Route path="/mydocuments/:documentId">
              <Document />
            </Route>
          </div>
          </>
        )}
      </Switch>
    </Router>
  );
};

export default App;
