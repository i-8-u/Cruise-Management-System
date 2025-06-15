import React from 'react';
import { useUser } from "../contexts/UserContext";  // Importing the useUser hook
import { User } from 'lucide-react'

const Header = () => {
  const { user } = useUser();  // Accessing user from the context

  return (
    <header className="flex items-center justify-end p-4 bg-white border-b border-gray-100">
      <div className="flex items-center gap-3">
        <div className="text-right">
          <div className="text-gray-800 font-medium">{user?.name || "Not Logged In !"}</div>
          <div className="text-sm text-gray-500">{user?.role || ""}</div>
        </div>
        <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 font-bold">
          <User size={20} />
        </div>
      </div>
    </header>
  );
};

export default Header;
