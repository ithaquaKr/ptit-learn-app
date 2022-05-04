import "./app.scss";

import Auth from "./pages/auth/Auth";
import Home from "./pages/home/Home";
import Account from "./pages/account/Account";
import MydocumentList from "./pages/mydocumentList/MydocumentList";
import Landingpage from "./pages/landingpage/Landingpage";
import Library from "./pages/library/Library";
import Aboutus from "./pages/aboutus/Aboutus";
import Todo from "./pages/todo/Todo";

import Sidebar from "./components/sidebar/Sidebar";


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "./context/authContext/AuthContext";

const App = () => {
  const { user } = useContext(AuthContext);


  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Landingpage /> : <Redirect to="/auth" />}
        </Route>
        <Route path="/auth">{!user ? <Auth /> : <Redirect to="/home" />}</Route>
        {user && (
          <>
          <Sidebar/>
          <div className="main-container">
            <Route path="/home">
              <Home/>
            </Route>
            <Route path="/mydocuments">
              <MydocumentList />
            </Route>
            <Route path="/library">
              <Library />
            </Route>
            <Route path="/todo">
              <Todo />
            </Route>
            <Route path="/account">
              <Account />
            </Route>
            <Route path="/aboutus">
              <Aboutus />
            </Route>
          </div>
          </>
        )}
      </Switch>
    </Router>
  );
};

export default App;
