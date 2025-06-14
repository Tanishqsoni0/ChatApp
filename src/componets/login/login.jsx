import "./login.css";
import { useState } from "react";
import { Link } from 'react-router-dom';
import {toast} from "react-toastify"
import {signInWithEmailAndPassword} from "firebase/auth"
import {auth,db} from "../../firebase"
import Chat from "../../assets/chat.png"

const Login = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } 
    catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (<div className="container"><div class="baton-0"><div class="metronome"><div class="baton"></div></div></div>
      <div class="baton-1"><div class="metronome"><div class="baton"></div></div></div>
      <div class="baton-2"><div class="metronome"><div class="baton"></div></div></div>
      <div class="baton-3"><div class="metronome"><div class="baton"></div></div></div>
      <div class="baton-4"><div class="metronome"><div class="baton"></div></div></div>
      <div class="baton-5"><div class="metronome"><div class="baton"></div></div></div>
      <div class="baton-6"><div class="metronome"><div class="baton"></div></div></div>
      <div class="baton-7"><div class="metronome"><div class="baton"></div></div></div>
      <div class="baton-8"><div class="metronome"><div class="baton"></div></div></div>
      <div class="baton-9"><div class="metronome"><div class="baton"></div></div></div>
      <div class="baton-10"><div class="metronome"><div class="baton"></div></div></div>
      <div class="baton-11"><div class="metronome"><div class="baton"></div></div></div>
      <div class="baton-12"><div class="metronome"><div class="baton"></div></div></div>
      <div class="baton-13"><div class="metronome"><div class="baton"></div></div></div>
      <div class="baton-14"><div class="metronome"><div class="baton"></div></div></div>
      <div class="baton-15"><div class="metronome"><div class="baton"></div></div></div>
      <div class="baton-16"><div class="metronome"><div class="baton"></div></div></div>
      <div class="baton-17"><div class="metronome"><div class="baton"></div></div></div>
      <div class="baton-18"><div class="metronome"><div class="baton"></div></div></div>
      <div class="baton-19"><div class="metronome"><div class="baton"></div></div></div>
      <div class="baton-20"><div class="metronome"><div class="baton"></div></div></div>
      <div class="baton-21"><div class="metronome"><div class="baton"></div></div></div>
      <div class="baton-22"><div class="metronome"><div class="baton"></div></div></div>
      <div class="baton-23"><div class="metronome"><div class="baton"></div></div></div>
      <div class="baton-24"><div class="metronome"><div class="baton"></div></div></div>
      <div class="baton-25"><div class="metronome"><div class="baton"></div></div></div>
      <div class="baton-26"><div class="metronome"><div class="baton"></div></div></div>
      <div class="baton-27"><div class="metronome"><div class="baton"></div></div></div>
      <div class="baton-28"><div class="metronome"><div class="baton"></div></div></div>
      <div class="baton-29"><div class="metronome"><div class="baton"></div></div></div>
      <div class="baton-30"><div class="metronome"><div class="baton"></div></div></div>
      <div class="baton-31"><div class="metronome"><div class="baton"></div></div></div>
      <div class="baton-32"><div class="metronome"><div class="baton"></div></div></div>
      <div class="baton-33"><div class="metronome"><div class="baton"></div></div></div>
      <div class="baton-34"><div class="metronome"><div class="baton"></div></div></div>
      <div class="baton-35"><div class="metronome"><div class="baton"></div></div></div></div>) : (
        <div className="login-page">
          <div className="leftside">
            <img className="IMG" alt="Img" src={Chat} />
          </div>
          <div className="login">
            <p className="heading">Welcome back</p>
            <form className="login-form" onSubmit={handleLogin}>
              <input
                className="email"
                type="text"
                placeholder="Email"
                name="email"
                required
              />
              <input
                className="password"
                type="password"
                placeholder="Password"
                name="password"
                required
              />
              <button className="signin">Sign In</button>
              <p className="text">
                Don't Have an Account.
                <br />
                <Link className="register-link" to="/Register">
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div> 
      )}
      
    </>
  );
};

export default Login