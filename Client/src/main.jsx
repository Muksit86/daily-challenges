import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./Healper/themeContext.jsx";
import { LogProvider } from "./Healper/LogContext.jsx";
import { ChallengesProvider } from "./Healper/ChallengesContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import Profile from "./Pages/Profile.jsx";
import DailyLogs from "./Pages/DailyLogs.jsx";
import Challenges from "./Pages/Challenges.jsx";
import NewChallenge from "./Pages/NewChallenge.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/logs",
        element: <DailyLogs />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/challenges",
        element: <Challenges />,
      },
      {
        path: "/newchallenge",
        element: <NewChallenge />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <LogProvider>
        <ChallengesProvider>
          <RouterProvider router={router}>
            <App />
          </RouterProvider>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </ChallengesProvider>
      </LogProvider>
    </ThemeProvider>
  </StrictMode>
);
