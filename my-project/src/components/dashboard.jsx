import React from "react";
import Nav from "./nav/nav";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    toast.success("Logged out");
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };
  return (
    <>
      <div className="bg-black h-[100vh]">
        <div className="fixed">
          <Toaster position="top-right" richColors />
        </div>
        <div className="pl-7 pt-5 flex justify-end">
          <Nav />
          <div className="flex flex-col w-9/12 items-end">
            <div className=" flex flex-col w-100 p-3">
              <div className=" items-end w-1/3 p-3">
                <button
                  className="text-white bg-[#103f47] hover:bg-[#1b6c7a] p-2 rounded-md hover:scale-105 duration-300"
                  onClick={logout} 
                >
                  LogOut
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
