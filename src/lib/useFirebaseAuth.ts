import { getAuth, onAuthStateChanged, Auth } from "firebase/auth";
import { useEffect } from "react";
import { app } from "@/firebase/firebase";
import { setActiveUser, setUserLogOutState } from "@/store/slice/userSlice";
import { useAppDispatch } from "@/store/hooks";
import { AppDispatch } from "@/store/store";

// This hook initializes Firebase auth listener and updates Redux store
export const useFirebaseAuth = (): Auth => {
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
  }, [dispatch, auth]);

  return auth; // Return auth instance if needed elsewhere
};

// Use this in App.tsx or a layout component that wraps your entire application
export const initializeFirebaseAuth = (store: { dispatch: AppDispatch }): void => {
  const auth = getAuth(app);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      store.dispatch(
        setActiveUser({
          userName: user.displayName || "User",
          userEmail: user.email || null,
        })
      );
    } else {
      store.dispatch(setUserLogOutState());
    }
  });
};

