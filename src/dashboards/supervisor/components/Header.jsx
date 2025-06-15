import { useUser } from "../contexts/UserContext";

function Header() {
  const { user } = useUser(); // get user from context
  
  if (!user) return null; // safe fallback if user isn't loaded yet
  
  return (
    <header className="bg-white border-b border-gray-200 py-3 px-6 flex items-center justify-end">
      <div className="flex items-center">
        <div className="flex flex-col items-end mr-3">
          <span className="text-sm font-medium text-gray-700">{user.name}</span>
          <span className="text-xs text-gray-500">{user.role}</span>
        </div>
        <div className="h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 font-medium">
        </div>
      </div>
    </header>
  )
}

export default Header
