import { useEffect, useState } from "react";
import { getRequest, baseurl } from "../utils/services";

export const useFetchRecipientUser = (chat, user) => {
  const [recipientUser, setRecipientUser] = useState(null);
  const [error, setError] = useState();
  // getRequest
  const recipientId = chat?.members.find((id) => id !== user?._id);
  useEffect(() => {
    const getUser = async () => {
      if (!recipientId) {
        return null;
      }
 
      const resp = await getRequest(`${baseurl}/users/find/${recipientId}`);
      if (resp.error) {
        return SpeechSynthesisErrorEvent(error);
      }
      setRecipientUser(resp);
    };
    getUser();
  }, [recipientId]);
  return { recipientUser };
};
