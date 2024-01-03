import { createContext, useCallback, useEffect, useState } from "react";
import { baseurl, getRequest } from "../utils/services";
// import { set } from "mongoose";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState();
  const [userChatsError, setUserChatsError] = useState();

  const [potentialChats, setPotentialChats] = useState([]);

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
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
