import Chat from "./componets/chat/chat"
import List from "./componets/list/list"
import Login from "./componets/login/login"
import Register from "./componets/login/register"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase"
import { useUserStore } from "./userStore"
import { useEffect } from "react"
import { useChatStore } from "./chatStore"
import { Router, Routes, Route } from "react-router-dom"

const App = () => {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  console.log(currentUser);

  if (isLoading) return <div className="loading">Loading...</div>;

  return (
    <>
        {currentUser ? (
          <>
            <div className="main-chat">
              <List />
              {chatId && <Chat />} 
            </div>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/Login" element={<Login />}/>
            <Route path="/Register" element={<Register />} />
          </Routes>
        )}
    </>
  );
}

export default App