import "./register.css";
import { useState } from "react";
import { Link } from 'react-router-dom';
import {toast} from "react-toastify"
import {createUserWithEmailAndPassword} from "firebase/auth"
import {auth,db} from "../../firebase"
import {doc,setDoc} from "firebase/firestore"
import Chat from "../../assets/chat.png"

const Register = () => {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });
  const [loading, setLoading] = useState(false);

  const handleavatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    const { username, email, password } = Object.fromEntries(formData);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        id: res.user.uid,
        blocked: [],
      });

      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: [],
      });

      toast.success("Account created! You can login now!");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="register-page">
        <div className="leftside">
          <img className="IMG" alt="Img" src={Chat} />
        </div>
        <div className="register">
          <p className="heading">Create an Account</p>
          <form className="register-form" onSubmit={handleRegister}>
            <label className="img-label" htmlFor="file">
              <img src={avatar.url || "./avatar.png"} className="avatar" alt="" />
              Upload an Image
            </label>
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={handleavatar}
            />
            <input
              className="username"
              type="text"
              placeholder="Username"
              name="username"
              required
            />
            <input className="email" type="text" placeholder="Email" name="email" required />
            <input
              className="password"
              type="password"
              placeholder="Password"
              name="password"
              required
            />
            <button className="signup">Sign Up</button>
            <p className="text1">
              Already Have an Account.
              <br />
              <Link className="login-link" to="/Login">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register