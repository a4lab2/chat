import { createContext, useCallback, useEffect, useState } from "react";
import { baseurl, postRequest } from "../utils/services";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [registerError, setRegisterError] = useState();
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);

  const [loginError, setLoginError] = useState();
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const user = localStorage.getItem("User");
    setUser(JSON.parse(user));
  }, []);

 
  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
    // console.log(info);
  }, []);

  const registerUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsRegisterLoading(true);
      setRegisterError(null);
      const res = await postRequest(
        `${baseurl}/users/register`,
        JSON.stringify(registerInfo)
      );
      // console.log(res);
      setIsRegisterLoading(true);
      if (res.error) {
        setIsRegisterLoading(false);
        return setRegisterError(res);
      }

      localStorage.setItem("User", JSON.stringify(res));
      setUser(res);
      setIsRegisterLoading(false);
    },
    [registerInfo]
  );

  const logout = useCallback(() => {
    localStorage.removeItem("User");
    setUser(null);
  }, []);

  const loginUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoginLoading(true);
      setLoginError(null);
      const res = await postRequest(
        `${baseurl}/users/login`,
        JSON.stringify(loginInfo)
      );
      if (res.error) {
        setIsLoginLoading(false);
        return setLoginError(res);
      }

      localStorage.setItem("User", JSON.stringify(res));
      setUser(res);
      setIsLoginLoading(false);
    },
    [loginInfo]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        loginInfo,
        updateLoginInfo,
        loginUser,
        loginError,
        isLoginLoading,
        updateRegisterInfo,
        logout,
        registerUser,
        registerError,
        isRegisterLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
