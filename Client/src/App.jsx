import { Outlet } from "react-router";
import Sidebar from "./Component/Sidebar";

// flex flex-col-reverse md:flex-row h-screen w-full overflow-hidden
// flex-1 flex flex-col overflow-hidden

function App() {
  return (
    <>
      <div className="flex flex-col-reverse md:flex-row h-screen w-full">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
}

export default App;
