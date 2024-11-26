import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/features/userSlice";
import { useState } from "react";
import { Confirm } from "react-admin";
import axios from "../axios/axios";
import { LogOut, Users } from "lucide-react";

const AdminNavbar = () => {

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      await axios.get("/logout")
        .then(() => {
          dispatch(setUserData(null));
          navigate('/signin');
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <Link
      to={to}
      className="px-6 py-2 text-emerald-50 hover:text-white transition-colors duration-200 relative group"
    >
      {children}
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
    </Link>
  );

  return (
    <nav className="sticky top-0 z-50">
        <Confirm
          isOpen={open}
          title="Confirmation"
          content="Are you sure you want to logout?"
          onClose={() => setOpen(false)}
          onConfirm={handleSignOut}
          cancel="Cancel"
          confirm="Yes"
          confirmColor="warning"
        />
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-900 to-emerald-800 opacity-95" />
          
          <div className="relative flex items-center justify-between w-full h-16 px-6 lg:px-12">
            <div className="flex items-center space-x-4">
              <Users className="mr-2 text-emerald-400" />
              <h1 className="text-2xl font-bold text-white">Admin</h1>
            </div>

            <div className="flex items-center space-x-2">
              <NavLink to="/adminhome">Home</NavLink>
              <NavLink to="#">About</NavLink>
              <NavLink to="/admindashboard">Dashboard</NavLink>
              <NavLink to="#">Contact</NavLink>
              
              <button
                onClick={() => setOpen(true)}
                className="ml-6 px-6 py-2 rounded-lg bg-emerald-700 text-emerald-50 hover:bg-emerald-600 
                           focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-emerald-800
                           transform hover:-translate-y-0.5 transition-all duration-200
                           shadow-lg hover:shadow-emerald-600/50 flex items-center"
              >
                <LogOut className="mr-2" size={18} /> Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
  );
};

export default AdminNavbar;