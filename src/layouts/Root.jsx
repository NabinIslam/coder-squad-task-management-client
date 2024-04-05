import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { IoLogOut } from 'react-icons/io5';
import { IoMdHome } from 'react-icons/io';
import { FaListCheck } from 'react-icons/fa6';
import { FaCheck } from 'react-icons/fa';
import { FaClipboardList } from 'react-icons/fa';
import { useAuth } from '../context/auth';
import toast from 'react-hot-toast';
import { MdError } from 'react-icons/md';
import { GiHamburgerMenu } from 'react-icons/gi';
import LoadingSpinner from '../ui/LoadingSpinner';

const Root = () => {
  const { logOut, user } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { id: 1, name: 'All Task', path: '/', icon: <IoMdHome /> },
    { id: 2, name: 'Completed', path: '/completed', icon: <FaCheck /> },
    { id: 3, name: 'Incomplete', path: '/incomplete', icon: <MdError /> },
  ];

  const handleSignOut = () => {
    logOut();
    navigate('/sign-in');
    toast.success(`Logout successful`);
  };

  if (!user) return <LoadingSpinner />;

  return (
    <main className="min-h-screen bg-black p-[20px] text-[#dfe6e9] flex flex-col lg:flex-row gap-[50px]">
      <div className="min-h-full border border-gray-700 rounded-xl bg-[#212120] basis-[30%] flex flex-col justify-between items-start">
        {/* user  */}
        <div className="flex items-center gap-3 px-[30px] py-[30px] w-full">
          <img
            className="rounded-full"
            height={40}
            width={40}
            src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
            alt="user profile picture"
          />
          <h5 className="font-semibold text-lg">{user?.name}</h5>
        </div>

        {/* navigation */}
        <div className="w-full flex flex-col">
          {navLinks.map(navlink => (
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'bg-[#323231] px-5 py-2 flex items-center gap-3 font-semibold text-md border-r-4 border-blue-500'
                  : 'w-full px-5 py-2 flex items-center gap-3 font-semibold text-md'
              }
              to={navlink.path}
              key={navlink.id}
            >
              {navlink.icon} {navlink.name}
            </NavLink>
          ))}
        </div>

        {/* logout button  */}

        <button
          className="flex items-center gap-1 font-semibold text-xl hover:text-blue-500 duration-200 px-[30px] py-[25px]"
          onClick={() => handleSignOut()}
        >
          <IoLogOut /> <span>Sign Out</span>
        </button>
      </div>
      <div className="min-h-full border border-gray-700 p-[30px] rounded-xl bg-[#212120] basis-full">
        <Outlet />
      </div>
    </main>
  );
};

export default Root;
