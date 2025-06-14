import "./index.scss"
import Chat from "./componets/chat/chat"
import List from "./componets/list/list"
import Login from "./componets/login/login"
import Register from "./componets/login/register"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase"
import { useUserStore } from "./userStore"
import { useEffect } from "react"
import { useChatStore } from "./chatStore"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

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

  // console.log(currentUser);

  if (isLoading) return <div class="container">
      <div class="baton-0"><div class="metronome"><div class="baton"></div></div></div>
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
      <div class="baton-35"><div class="metronome"><div class="baton"></div></div></div>
</div>;

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