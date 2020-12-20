import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import { createContext, useState } from 'react';
import Home from './components/Home/Home';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import Login from './components/Login/Login';
import BookShow from './components/BookShow/BookShow';
export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/book-show/:key" component={BookShow} />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
