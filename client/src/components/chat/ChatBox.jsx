import React, { useContext, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { Stack } from "react-bootstrap";

import InputEmoji from "react-input-emoji";

import moment from "moment";
const ChatBox = () => {
  const { user } = useContext(AuthContext);
  const { currentChat, messages, isMessageLoading,sendTextMessage } = useContext(ChatContext);
  const { recipientUser } = useFetchRecipientUser(currentChat, user);
const [textMessage, setTextMessage] = useState();
// useState
  console.log("text:", textMessage);

  if (!recipientUser)
    return (
      <p style={{ textAlign: "center", width: "100%" }}>No Chat Selected</p>
    );

  if (isMessageLoading)
    return <p style={{ textAlign: "center", width: "100%" }}>Loading Chats</p>;

  return (
    <Stack gap={4} className="chat-box">
      <div className="chat-header">
        <strong>{recipientUser?.user.name}</strong>
      </div>
      <Stack gap={3} className="messages">
        {messages &&
          messages.map((message, i) => {
           return ( <Stack key={i} className={
             `${message.senderId === user._id ? "message self align-self-end flex-grow-0" : "message  align-self-start flex-grow-0"}`

           }>
            <span>{message?.text}</span>
            <span className="message-footer">{moment(message.createdAt).calendar()}</span>
          </Stack>);
          })}
      </Stack>
      <Stack direction="horizontal" gap={3} className="chat-input">
        <InputEmoji value={textMessage} onChange={setTextMessage} fontFamily="nunito" borderColor="rgba(72,112,223,0.2)"/>
        <button  onClick={()=>sendTextMessage(textMessage,user,currentChat._id,setTextMessage)} className="send-btn"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
  <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
</svg></button>
      </Stack>
    </Stack>
  );
};

export default ChatBox;
