import React, { useEffect, useState } from "react";
import logo from "./insta-logo.png";

import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import "./Header.css";
import { Button } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import { auth } from "./firebase";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Header({ setUserName, user, setUser }) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [signIn, setSignIn] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [modalStyle] = useState(getModalStyle);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        setUserName(authUser);
        if (authUser.displayName) {
        } else {
          return authUser.updateProfile({
            displayName: username,
          });
        }
      } else {
        setUser(null);
      }
    });
  }, [user]);
  function signUp(e) {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)

      .catch((err) => alert(err.message));
    setOpen(false);
  }
  function signIng(e) {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)

      .catch((err) => alert(err.message));
    setSignIn(false);
  }
  return (
    <div className="header">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form onSubmit={signUp}>
            <center>
              <img src={logo} alt="inta logo" />
              <Input
                type="text"
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                type="text"
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <Button className="style-btn ex" type="submit">
                log in
              </Button>
            </center>
          </form>
        </div>
      </Modal>

      <Modal open={signIn} onClose={() => setSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form onSubmit={signIng}>
            <center>
              <img src={logo} alt="inta logo" />

              <Input
                type="text"
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <Button
                className="style-btn"
                className="style-btn ex"
                type="submit"
              >
                log in
              </Button>
            </center>
          </form>
        </div>
      </Modal>

      <div className={`header-components  ${user && "extra"}`}>
        <div className="logo">
          <img src={logo} alt="an insta logo" className="insta" />
        </div>
        <div className="btn">
          {user ? (
            <Button className={`style-btn`} onClick={() => auth.signOut()}>
              Log out
            </Button>
          ) : (
            <div className="bts">
              <Button className="style-btn" onClick={() => setSignIn(true)}>
                Log in
              </Button>
              <Button className="style-btn" onClick={() => setOpen(true)}>
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
