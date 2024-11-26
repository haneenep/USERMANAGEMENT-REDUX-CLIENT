import Navbar from "../../components/Navbar";
import { BsInstagram } from "react-icons/bs";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useSelector } from "react-redux";
import defaultImage from "../../assets/user.jpg";

interface Root {
  user : {
    userData : {
      name : string;
      profile : string;
      bio : string;
    }
  }
}

const Home = () => {

  const userData = useSelector((state: Root) => state.user.userData);

  const profile = userData.profile ? userData.profile : defaultImage;

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-emerald-800 to-emerald-900 py-12">
        <div className="max-w-md w-full bg-emerald-950/90 backdrop-blur-sm shadow-2xl rounded-2xl text-emerald-50 transform transition-transform hover:scale-[1.02]">
          {/* Cover Image */}
          <div className="rounded-t-2xl h-48 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-emerald-950/40" />
            <img
              className="object-cover object-center w-full h-full"
              src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
              alt="Profile Cover"
            />
          </div>

          {/* Profile Picture */}
          <div className="mx-auto w-36 h-36 relative -mt-20">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-emerald-950 shadow-xl">
                <img
                  className="object-cover object-center w-full h-full"
                  src={profile}
                  alt={userData?.name || "Profile"}
                />
            </div>
          </div>

          {/* Profile Info */}
          <div className="text-center px-6 mt-4">
            <h2 className="text-2xl font-bold text-emerald-50">
              {userData?.name ? userData.name.toUpperCase() : "User Name"}
            </h2>
            <p className="mt-2 text-emerald-300">
              {userData?.bio ? userData.bio.toUpperCase() : "No bio available"}
            </p>
          </div>

          {/* Social Stats */}
          <div className="grid grid-cols-3 gap-4 py-6 mt-6 border-t border-emerald-800/50 mx-8">
            <div className="text-center group">
              <div className="flex justify-center mb-2 text-emerald-400 group-hover:text-emerald-300 transition-colors">
                <BsInstagram size={24} />
              </div>
              <div className="text-lg font-semibold">2k</div>
              <div className="text-xs text-emerald-400">Followers</div>
            </div>
            <div className="text-center group">
              <div className="flex justify-center mb-2 text-emerald-400 group-hover:text-emerald-300 transition-colors">
                <FaGithub size={24} />
              </div>
              <div className="text-lg font-semibold">10k</div>
              <div className="text-xs text-emerald-400">Stars</div>
            </div>
            <div className="text-center group">
              <div className="flex justify-center mb-2 text-emerald-400 group-hover:text-emerald-300 transition-colors">
                <FaLinkedin size={24} />
              </div>
              <div className="text-lg font-semibold">15k</div>
              <div className="text-xs text-emerald-400">Connections</div>
            </div>
          </div>

          {/* Follow Button */}
          <div className="px-8 pb-8">
            <button
              className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 focus:ring-4 focus:ring-emerald-500/50 font-semibold text-white px-6 py-3 transition-all duration-200 transform hover:-translate-y-0.5"
              // onClick={handleFollow}
            >
              Follow
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;