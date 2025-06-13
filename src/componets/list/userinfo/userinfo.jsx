import './userinfo.css'
import { useUserStore } from '../../../userStore'
import {auth} from "../../../firebase"
import { useEffect, useRef, useState } from "react";
const Userinfo = () => {
  const [chat, setChat] = useState();
  const boxRef = useRef(null);
  const [isNarrow, setIsNarrow] = useState(false);

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      setIsNarrow(entry.contentRect.width < 500);
    });

    if (boxRef.current) {
      observer.observe(boxRef.current);
    }

    return () => {
      if (boxRef.current) {
        observer.unobserve(boxRef.current);
      }
    };
  }, []);

  const {currentUser} =useUserStore();

  const handleLogout = () => {
    auth.signOut();
    setChat();
  };

  return (
    <div ref={boxRef} className='userinfo' style={{
        borderTopRightRadius: isNarrow ? "0px" : "12px"
      }} >
      <div className='user'>
        <img src={currentUser.avatar || "./avatar.png"} className='user-avatar' alt=""/>
        <p className='user-name'>{currentUser.username}</p>
      </div>
      <div className='user-icons'>
        <img src='./more.png' alt=""/>
        {/* <img src='./video.png' alt=""/> */}
        <img src='./edit.png' alt=""/>
        <button className="logout" onClick={handleLogout}>
            Log Out
        </button>
      </div>
    </div>
  )
}

export default Userinfo