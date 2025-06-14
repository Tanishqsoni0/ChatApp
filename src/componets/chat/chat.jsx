import "./chat.css"
import { useState,useEffect,useRef } from "react";
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
  
  const handleSend = async () => {
  if (text === "") return;

  const messageToSend = text;
  setText("");

  try {
    await updateDoc(doc(db, "chats", chatId), {
      messages: arrayUnion({
        senderId: currentUser.id,
        text: messageToSend,
        createdAt: new Date(),
      }),
    });

    const userIDs = [currentUser.id, user.id];

    for (const id of userIDs) {
      const userChatsRef = doc(db, "userchats", id);
      const userChatsSnapshot = await getDoc(userChatsRef);

      if (userChatsSnapshot.exists()) {
        const userChatsData = userChatsSnapshot.data();
        const chatIndex = userChatsData.chats.findIndex(
          (c) => c.chatId === chatId
        );

        if (chatIndex !== -1) {
          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen = id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        }
      }
    }
  } catch (err) {
    console.log(err);
  } /*finally {
    setText("");
  }*/
};


  return (
    <div className="chat">
      <div className="top">
        <div className="receiver">
          <img src={user?.avatar || "./avatar.png"} alt="" />
          <div className="receiver-info">
            <span>{user?.username}</span>
            <p>Lorem ipsum dolor, sit amet.</p>
          </div>
        </div>
        <div className="receiver-icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
      </div>
      <div className="center">
        {chat?.messages?.map((message) => (
          <div
            className={
              message.senderId === currentUser?.id ? "message-own" : "message"
            }
            key={message?.createAt}
          >
            <p>{message.text}</p>
            {/* <span>{message}</span> */}
          </div>
        ))}
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        {/* <div className="icons"></div> */}
        <input
          type="text"
          value={text}
          className="message-box"
          placeholder="Type a message..."
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) =>{
            if(e.key === "Enter"){
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <button className="sendButton" onClick={handleSend}>
          <img src="./message.png" alt="" />
        </button>
      </div>
    </div>
  );
}

export default Chat