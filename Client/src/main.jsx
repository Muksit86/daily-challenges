import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./Healper/themeContext.jsx";
import { LogProvider } from "./Healper/LogContext.jsx";
import { ChallengesProvider } from "./Healper/ChallengesContext.jsx";
import { AuthProvider } from "./Healper/AuthContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Dashboard from "./Pages/Dashboard.jsx";
import LandingPage from "./Pages/LandingPage.jsx";
import Login from "./Pages/Login.jsx";
import Profile from "./Pages/Profile.jsx";
import DailyLogs from "./Pages/DailyLogs.jsx";
import Challenges from "./Pages/Challenges.jsx";
import NewChallenge from "./Pages/NewChallenge.jsx";
import About from "./Pages/About.jsx";
import PrivacyPolicy from "./Pages/PrivacyPolicy.jsx";
import NotFound from "./Pages/NotFound.jsx";
import Contact from "./Pages/Contact.jsx";

import "./tempData/loadDummyData";
import ProtectedRoute from "./Component/ProtectedRoute.jsx";
import RequestingPage from "./Pages/RequestingPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <NotFound />, // 👈 here
  },
  {
    path: "/login",
    // element: <Login />,
    element: <RequestingPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "logs",
        element: <DailyLogs />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "challenges",
        element: <Challenges />,
      },
      {
        path: "newchallenge",
        element: <NewChallenge />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "privacy",
        element: <PrivacyPolicy />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <LogProvider>
          <ChallengesProvider>
            <RouterProvider router={router} />
            <ToastContainer
              position="top-center"
              autoClose={1000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              draggable
              theme="light"
            />
          </ChallengesProvider>
        </LogProvider>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
