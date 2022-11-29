import { createContext } from "react";

const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => {}
});
export default UserContext;
