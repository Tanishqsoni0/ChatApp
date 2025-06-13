import "./login.css";
import { useState } from "react";
import { Link } from 'react-router-dom';
import {toast} from "react-toastify"
import {signInWithEmailAndPassword} from "firebase/auth"
import {auth,db} from "../../firebase"
import {doc,setDoc} from "firebase/firestore"
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
    </>
  );
};

export default Login