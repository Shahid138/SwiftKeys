import  { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { initializeFirebaseAuth } from "./lib/useFirebaseAuth";


initializeFirebaseAuth(store);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </StrictMode>
);
