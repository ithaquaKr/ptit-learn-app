import "./app.scss";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import Login from "./pages/login/Login";
import Account from "./pages/account/Account";
import NewDocument from "./pages/newDocument/NewDocument";
import DocumentList from "./pages/documentList/DocumentList";
import Document from "./pages/document/Document";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/authContext/AuthContext";
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";

const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Redirect to="/login" />}
        </Route>
        <Route path="/register">
          {!user ? <Register /> : <Redirect to="/" />}
        </Route>
        <Route path="/login">{!user ? <Login /> : <Redirect to="/" />}</Route>
        {user && (
          <>
          <Navbar/>
          <div className="main-container">
            <Sidebar/>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route path="/watch">
              <Watch />
            </Route>
            <Route path="/account">
              <Account />
            </Route>
            <Route path="/newDocument">
              <NewDocument />
            </Route>
            <Route path="/documents">
              <DocumentList />
            </Route>
            <Route path="/documents/:documentId">
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
