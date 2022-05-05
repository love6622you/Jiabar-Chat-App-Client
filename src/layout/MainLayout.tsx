import { Outlet, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useStore } from "@/store";

const MainLayout = () => {
  const token = useStore((state) => state.token);

  if (!token) {
    console.log("enter?");
    return <Navigate to={"/login"} />;
  }
  return (
    <div className="flex h-full flex-col pt-20">
      <Header />
      <main className="flex h-full">
        <aside className="flex-[3]">
          <Sidebar />
        </aside>

        <article className="flex-[7]">
          <Outlet />
        </article>
      </main>
    </div>
  );
};

export default MainLayout;
