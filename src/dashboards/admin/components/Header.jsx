import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext"; // NEW: import user context
import { User } from "lucide-react"

const Header = ({ title, subtitle }) => {
  const { user } = useUser(); // get user from context

  if (!user) return null; // safe fallback if user isn't loaded yet

  return (
    <div className="flex justify-between items-start mb-8" style={{border: 'none', borderBottom: '1px solid #ccc'}}>
      <div>
        <h1 className="text-3xl font-bold text-pink-600">{title}</h1>
        <p className="text-gray-600 mt-1">{subtitle}</p>
      </div>
      <div className="flex items-center">
        <div className="text-right mr-3">
          <p className="font-medium text-gray-800">{user.name}</p>
          <p className="text-sm text-gray-500">{user.role}</p>
        </div>
        <Link to="/profile">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold">
            <User />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
