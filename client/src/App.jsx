import "./app.scss";
import Home from "./pages/home/Home";
// import Read from "./pages/read/Read";
import Account from "./pages/account/Account";
// import NewDocument from "./pages/newDocument/NewDocument";
import MydocumentList from "./pages/mydocumentList/MydocumentList";
// import Document from "./pages/document/Document";
import Landingpage from "./pages/landingpage/Landingpage";
import Library from "./pages/library/Library";
import Aboutus from "./pages/aboutus/Aboutus";

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
            {/* <Route path="/read/:documentId">
              <Read />
            </Route> */}
            <Route path="/account">
              <Account />
            </Route>
            <Route path="/mydocuments">
              <MydocumentList />
            </Route>
            <Route path="/library">
              <Library />
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
