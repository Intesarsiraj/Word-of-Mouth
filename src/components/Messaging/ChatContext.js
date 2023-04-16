import { createContext, useContext, useReducer } from "react";
import { AuthProvider } from "../../context/AuthProvider";
import useAuth from "../../hooks/useAuth";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { anyUser } = useAuth();
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  const chatReducer = (state, action) => {
    console.log("Inside chatReducer", action);
    //what does switch do - pays attention to the action type and makes you follow the use case of whatever action is used
    switch (action.type) {
      case "CHANGE_USER": //where are we using "change-user"--> this is the action type. And if this is the action type, the following code block is executed
        console.log("payload", action.payload);
        return {
          user: action.payload,
          chatId:
            anyUser.uid > action.payload.uid
              ? anyUser.uid + action.payload.uid
              : action.payload.uid + anyUser.uid,
        };

      default: //if action type is none of them, do this
        return state;
    }
  };
  //I feel like we're setting dispatch (in chats.js) but we're not setting state anywhere( unless the return block above is supposed to be setting the state?)?
  //ON clicking the div in Chats --> handle select runs --> which makes dispatch run/get set
  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;
