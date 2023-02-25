import { useSelector } from "react-redux";

function CanEditMsg({ children, msg }) {
  const { chat, userId } = useSelector((state) => ({
    chat: state.chats.currentChat,
    userId: state.user.userId,
  }));

  if (
    (chat && chat.moderators && chat.moderators.hasOwnProperty(userId)) ||
    chat.owner === userId ||
    (msg && msg.uid === userId)
  )
    return children;
  else return null;
}

export default CanEditMsg;
