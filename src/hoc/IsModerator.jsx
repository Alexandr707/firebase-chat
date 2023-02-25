import { useSelector } from "react-redux";

function IsModerator({ children, chat, uid }) {
  const { userId, currentChat } = useSelector((state) => ({
    userId: state.user.userId,
    currentChat: state.chats.currentChat,
  }));

  if (!userId || (!chat && !currentChat)) return null;
  if (
    !chat &&
    (currentChat.owner === uid ||
      (currentChat.moderators && currentChat.moderators[uid]))
  )
    return children;
  if (chat && chat.owner === userId) return children;
  return null;
}

export default IsModerator;
