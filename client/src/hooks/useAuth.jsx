import { useEffect, useState, useContext } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import app from "../firebase";
import { ModalContext } from "../context/ModalProvider";
import { EditorContext } from "../context/EditorProvider";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const useAuth = () => {
  const [user, setUser] = useState(null);
  const { setIsLogOpen } = useContext(ModalContext);
  const {socket} = useContext(EditorContext)

  const login = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        const user = result.user;
        socket.emit("add-user", user.uid)
        setIsLogOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        return true;
      })
      .catch((error) => {
        return false;
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(user);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { user, login, logout };
};

export default useAuth;
