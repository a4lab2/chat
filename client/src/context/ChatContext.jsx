import { createContext, useCallback, useEffect, useState } from "react";
import { baseurl, getRequest, postRequest } from "../utils/services";
// import { set } from "mongoose";
import {io} from "socket.io-client" 
export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState();
  const [userChatsError, setUserChatsError] = useState();
  const [messages, setMessages] = useState();
  const [isMessageLoading, setIsMessageLoading] = useState();
  const [messageError, setMessageError] = useState();
  const [potentialChats, setPotentialChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);

  const [sendTextMessageError, setSendTextMessageError] = useState();
  const [newMessage, setNewMessage] = useState();
  const [socket, setSocket] = useState();


useEffect(() => {
  const newSocket=io("localhost:3000")
  setSocket(newSocket)
  return () => newSocket.disconnect()
}, [user]);



  useEffect(() => {
    const getUsers = async () => {
      const response = await getRequest(`${baseurl}/users`);
      if (response.error) {
        return console.log("Error Getting users", response);
      }
      const pChats = response.filter((u) => {
        let isChatCreated = false;

        if (user?._id === u.id) {
          return false;
        }

        if (userChats) {
          isChatCreated = userChats?.some((chat) => {
            return chat.members[0] === u._id || chat.members[1] === u._id;
          });
        }

        return !isChatCreated;
      });

      setPotentialChats(pChats);
    };
    getUsers();
  }, [userChats]);

  useEffect(() => {
    const getUserChats = async () => {
      setIsUserChatsLoading(true);
      setUserChatsError(null);
      if (user?._id) {
        const resp = await getRequest(`${baseurl}/chats/${user?._id}`);
        setIsUserChatsLoading(false);
        if (resp.error) {
          return setUserChatsError(resp.error);
        }
        setUserChats(resp);
      }
    };
    getUserChats();
  }, [user]);

  useEffect(() => {
    const getMessages = async () => {
      setIsMessageLoading(true);
      setMessageError(null);

      const resp = await getRequest(`${baseurl}/messages/${currentChat?._id}`);
      setIsMessageLoading(false);
      if (resp.error) {
        return setMessageError(resp.error);
      }
      setMessages(resp);
    };
    getMessages();
  }, [currentChat]);

  const sendTextMessage = useCallback(
    async (textMessage, sender, currentChatId, setTextMessage) => {
      if (!textMessage) return console.log("Type something here");

      const resp = await postRequest(
        `${baseurl}/messages`,
        JSON.stringify({ text:textMessage, chatId: currentChat._id,senderId:sender._id })
      );
      if (resp.error) {
        return setSendTextMessageError(resp);
      }

      //potential Error
      setNewMessage(resp);
      console.log(resp);
      setMessages((prev)=>[...prev, resp]);
      setTextMessage("");
    }
  );

  const createChat = useCallback(async (firstId, secondId) => {
    const resp = await postRequest(
      `${baseurl}/chats`,
      JSON.stringify({ firstId, secondId })
    );
    if (resp.error) {
      return console.log("Error creating chat", resp);
    }
    setUserChats([...userChats, resp]);
  });

  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
  });

  return (
    <ChatContext.Provider
      value={{
        userChats,
        setUserChats,
        isUserChatsLoading,
        setIsUserChatsLoading,
        userChatsError,
        setUserChatsError,
        potentialChats,
        createChat,
        updateCurrentChat,
        messages,
        isMessageLoading,
        messageError,
        currentChat,
        sendTextMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
