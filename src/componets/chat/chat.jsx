import "./chat.css"
import { useState,useEffect,useRef } from "react";
import {auth} from "../../firebase"
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,} from "firebase/firestore"
import {db} from "../../firebase"
import {useChatStore} from "../../chatStore"
import { useUserStore } from "../../userStore";

const Chat = () => {
  const [chat, setChat] = useState();
  // const [open, setOpen] = useState(false);
  const [text, setText]=useState("");

  const{currentUser} = useUserStore();
  const{chatId,user} = useChatStore();

  const endRef =useRef(null)

  useEffect(()=>{
    endRef.current?.scrollIntoView({behavior: "smooth"})
  },[]);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });

    return () => {
      unSub();
    };
  }, [chatId]);
  

  const handleLogout = () => {
    auth.signOut();
    setChat();
  };
  
  const handleSend = async () => {
    if (text === "") return;
    try {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          ccreatedAt: new Date(),
        }),
      });
      const userIDs = [currentUser.id, user.id];

      userIDs.forEach(async (id) => {
        const userChatsRef = doc(db, "userchats", id);
        const userChatsSnapshot = await getDoc(userChatsRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();

          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (err) {
      console.log(err);
    } finally {
      console.log("done");
      setText("");
      console.log("not done");
    }
  };

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src={user?.avatar || "./avatar.png"} alt="" />
          <div className="texts">
            <span>{user?.username}</span>
            <p>Lorem ipsum dolor, sit amet.</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <button className="logout" onClick={handleLogout}>
          Log Out
        </button>
      </div>
      <div className="center">
        {chat?.messages?.map((message) => (
          <div
            className={
              message.senderId === currentUser?.id ? "message-own" : "message"
            }
            key={message?.createAt}>
            <div className="texts">
              <p>{message.text}</p>
              {/* <span>{message}</span> */}
            </div>
          </div>
        ))}
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons"></div>
        <input
          type="text"
          className="message-box"
          placeholder="Type a message..."
          onChange={(e) => setText(e.target.value)}
        />
        <button className="sendButton" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat