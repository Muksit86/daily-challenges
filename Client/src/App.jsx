import { Outlet } from "react-router";
import Sidebar from "./Component/Sidebar";
import TrialBanner from "./Component/TrialBanner";

// flex flex-col-reverse md:flex-row h-screen w-full overflow-hidden
// flex-1 flex flex-col overflow-hidden

function App() {
  return (
    <>
      <div className="flex flex-col h-screen w-full">
        <TrialBanner />
        <div className="flex flex-col-reverse md:flex-row flex-1 overflow-hidden">
          <Sidebar />
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
