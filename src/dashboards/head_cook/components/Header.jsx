import { Link } from "react-router-dom"
import { User } from 'lucide-react'

import { useUser } from '../context/UserContext';

const Header = () => {

  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="flex justify-between items-center p-4" style={{border: 'none', borderBottom: '1px solid #ccc'}}>
      <div className="flex items-center">
        {/* <button className="mr-2 text-gray-600">
          
        </button> */}
      </div>

      <div className="flex items-center">
        <div className="mr-4 text-right">
          <div className="font-medium">{user.name}</div>
          <div className="text-sm text-gray-500">{user.role}</div>
        </div>
        <div>
          <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 font-bold">
          <User className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
