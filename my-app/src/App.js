import Login from "./Pages/Login";
import firebase from "./libs/firebase";
import "./App.css";
import { useEffect, useState } from "react";
import Home from './Pages/Home'
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  });
  return (
    <div className="App">
     {user ? <Home user={user} /> : <Login />}
    </div>
  );
}
export default App;
