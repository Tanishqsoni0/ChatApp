import Chat from "./componets/chat/chat"
import List from "./componets/list/list"
import Login from "./componets/login/login"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase"
import { useUserStore } from "./userStore"
import { useEffect } from "react"
import { useChatStore } from "./chatStore"

const App = () => {

  const {currentUser,isLoading,fetchUserInfo} = useUserStore()
  const {chatId} = useChatStore()

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  console.log(currentUser)

  if (isLoading) return <div className="loading">Loading...</div>
  
  return (
    <div className="chats">
      {currentUser ? (
        <>
          <List />
          {chatId && <Chat />}
        </>
      ) : (
        <Login/>
      )}
    </div>
  )
}

export default App