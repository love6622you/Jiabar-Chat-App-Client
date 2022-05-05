import { Outlet, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import { useStore } from "@/store";

const WithHeaderLayout = () => {
  const token = useStore((state) => state.token);
  if (!token) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="flex h-full flex-col pt-20">
      <Header />
      <main className="flex h-full">
        <article className="flex-1">
          <Outlet />
        </article>
      </main>
    </div>
  );
};

export default WithHeaderLayout;
