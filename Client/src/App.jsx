import { Outlet } from "react-router";
import Sidebar from "./Component/Sidebar";

function App() {
  return (
    <>
      <div className="flex flex-col-reverse md:flex-row h-screen w-full overflow-hidden">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
}

export default App;
