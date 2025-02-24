import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { app } from "@/firebase/firebase";
import { setActiveUser, setUserLogOutState } from "@/store/slice/userSlice";
import { useAppDispatch } from "@/store/hooks";
import { useDispatch } from "react-redux";

// This hook initializes Firebase auth listener and updates Redux store
export const useFirebaseAuth = () => {
  const dispatch = useAppDispatch();
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        dispatch(
          setActiveUser({
            userName: user.displayName || "User", 
            userEmail: user.email,
          })
        );
      } else {
        // User is signed out
        dispatch(setUserLogOutState());
      }
    });

    // Clean up subscription
    return () => unsubscribe();
  }, [useDispatch]);

  return auth; // Return auth instance if needed elsewhere
};

// Use this in App.js or a layout component that wraps your entire application
export const initializeFirebaseAuth = (store) => {
  const auth = getAuth(app);
  
  onAuthStateChanged(auth, (user) => {
    if (user) {
      store.dispatch(
        setActiveUser({
          userName: user.displayName || "User",
          userEmail: user.email,
        })
      );
    } else {
      store.dispatch(setUserLogOutState());
    }
  });
};