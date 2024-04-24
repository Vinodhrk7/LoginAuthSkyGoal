"use client";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const Navbar = () => {
  const token = Cookies.get("token");
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    toast.success("Logged out successfully");
    setTimeout(() => {
      router.push("/auth/sign-in");
    }, 1000);
  };
  return (
    <nav className="flex items-center justify-between px-10 py-2 border-b">
      <div>
        <h1 className="text-3xl font-semibold">Auth</h1>
      </div>
      {token && (
        <button className="button-style" onClick={handleLogout}>
          Log out
        </button>
      )}
    </nav>
  );
};
export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
