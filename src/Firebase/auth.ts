import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
} from "firebase/auth";
import { auth } from "./firebase";

export const doRegisterUser = async (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};
export const doLoginUser = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doLogoutUser = async () => {
  return signOut(auth);
};

export const doPasswordReset = async (email: string) => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordUpdate = async (password: string) => {
  const user = auth.currentUser;
  if (!user) return;
  return updatePassword(user, password);
};


