import AdminNavbar from "../../components/AdminNavbar";

const AdminHome = () => {
  return (  
    <>
      <AdminNavbar />
      <div className="min-h-screen flex items-center justify-center bg-emerald-900 -mt-16">
        <div className="bg-emerald-950 shadow-xl rounded-lg text-emerald-600 ">
          <div className="rounded-t-lg h-32 overflow-hidden">
            <img
              className="object-cover object-top w-full"
              src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
              alt="Mountain"
            />
          </div>
          <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
            {/* <img
          className="object-cover object-center h-32"
          src={baseURL+`/public/${fetchUserData.profile}`}
         
        /> */}
          </div>
          <div className="text-center mt-2">
            <h2 className="font-semibold text-white"> WELCOME ADMIN </h2>

            <p className="text-gray-400"> ADMIN PANEL </p>
          </div>
          <div className="p-4 border-t mx-8 mt-2">
            <button
              className="w-1/2 block mx-auto rounded-full bg-emerald-700 hover:shadow-lg font-semibold text-white px-6 py-2"
              // onClick={handleFollow}
            >
              Dashboard
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
