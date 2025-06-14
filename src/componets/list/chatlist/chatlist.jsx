import './Chatlist.css'
import Adduser from '../../addUser/adduser'
import { useRef,useEffect, useState } from 'react';
import { useUserStore } from '../../../userStore';
import { doc, getDoc,updateDoc,onSnapshot } from 'firebase/firestore';
import { db } from "../../../firebase"
import { useChatStore } from "../../../chatStore"


const Chatlist = () => {
  const [chats, setChats] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const [input, setInput] = useState("");
  const {currentUser}=useUserStore();
  const {changeChat} = useChatStore();
  const [isNarrow, setIsNarrow] = useState(false);
  const boxRef = useRef(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "userchats", currentUser.id),
      async (res) => {
        setLoading(true);
        const items = res.data().chats;

        const promises = items.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocSnap.data();

          return { ...item, user };
        });

        const chatData = await Promise.all(promises);

        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
        setLoading(false);
      }
    );
    return () => {
      unSub();
    };
  }, [currentUser.id]);
  
  const handleSelect = async (chat) => {
    const userChats = chats.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });

    const chatIndex = userChats.findIndex(
      (item) => item.chatId === chat.chatId
    );

    userChats[chatIndex].isSeen = true;

    const userChatsRef = doc(db, "userchats", currentUser.id);

    try {
      await updateDoc(userChatsRef, {
        chats: userChats,
      });
      changeChat(chat.chatId, chat.user);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredChats = chats.filter((c) =>
    c.user.username.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div
      ref={boxRef}
      className="chatlist"
      style={{
        borderBottomRightRadius: isNarrow ? "0px" : "12px",
      }}
    >
      <div className="search">
        <div className="searchBar">
          <img className="search-img" src="/search.png" alt="" />
          <input
            className="search-input"
            type="text"
            placeholder="Search"
            onChange={(e) => setInput(e.target.value)}
          />
          <img
            I
            src={addMode ? "./minus.png" : "./plus.png"}
            alt=""
            className="add"
            onClick={() => setAddMode((prev) => !prev)}
          />
        </div>
      </div>
      {/* {loading ? (
        <div className="spinner">Loading chats...</div>
      ) : (
        filteredChats.map((chat) => (
          <div
            className="other-users"
            key={chat.chatId}
            onClick={() => handleSelect(chat)}
            style={{ backgroundColor: chat?.isSeen ? "" : "lightblue" }}
          >
            <img src={chat.user.avatar || "./avatar.png"} alt="" />
            <div className="other-user-name">
              <span>{chat.user.username}</span>
              <p>{chat.lastMessage}</p>
            </div>
          </div>
        ))
      )} */}

      {filteredChats.map((chat)=>(
        <div className="other-users" key={chat.chatId} onClick={()=>handleSelect(chat)} style={{backgroundColor: chat?.isSeen ?"": 'lightblue' }}>
          <img src={chat.user.avatar || './avatar.png'} alt=""/>
          <div className="other-user-name">
            <span>{chat.user.username}</span>
            <p>
              {chat.lastMessage}
            </p>
          </div>
        </div>
      ))}
      {addMode && <Adduser />}
    </div>
  );
};

export default Chatlist;