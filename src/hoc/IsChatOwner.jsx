import { useSelector } from "react-redux";

function IsChatOwner({ children, chat }) {
  const { userId, currentChat } = useSelector((state) => ({
    userId: state.user.userId,
    currentChat: state.chats.currentChat,
  }));

  if (!userId || (!chat && !currentChat)) return null;
  if (!chat && currentChat.owner === userId) return children;
  if (chat && chat.owner === userId) return children;
  return null;
}

export default IsChatOwner;
