import { clsx } from "clsx";
import { useEffect, useState } from "react";
import ChatsList from "../../component/ChatsList/ChatsList";
import MenuIcon from "../../component/MenuIcon/MenuIcon";
import Chat from "../../component/Chat";
import { useSelector } from "react-redux";
import "./MainPage.scss";
import { setColorSchema } from "../../utils/setColorSchema";

function MainPage() {
  const [open, setOpen] = useState(false);
  const currentChat = useSelector((state) => state.chats.currentChat);
  const userInfo = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    if (userInfo && userInfo.preferences) {
      setColorSchema(userInfo.preferences);
    }
  }, [userInfo]);

  useEffect(() => {
    open && setOpen(false);
  }, [currentChat]);

  return (
    <div className="mainPage">
      <div className="main__wrapp">
        <div className="main__flex">
          <div className="main__menuIcon">
            <MenuIcon open={open} onMouseUp={() => setOpen(!open)} />
          </div>
          <div className={clsx("main__chatList", open && "open")}>
            <ChatsList />
          </div>
          <div className="main__chat">
            <Chat.Title />
            <Chat.Msg />
            <Chat.NewMsg />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
