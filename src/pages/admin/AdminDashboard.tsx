import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
import { Pencil, Trash2, Search, Plus } from "lucide-react";
// import { useDispatch } from "react-redux";
import AdminNavbar from "../../components/AdminNavbar";
import axios from "../../axios/axios";
import useDebounce from "../../hooks/useDebounce";
import { AddUserValidationSchema } from "../../formvalidation/AddUserValidation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import { editUserNameValidationSchema } from "../../formvalidation/EditUserValidation";

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
};

interface EditNameState {
  username: string;
  id: string;
  user_id: string;
}

interface AddUserValues {
  name: string;
  email: string;
  password: string;
  cpassword: string;
}

const AdminDashboard = () => {
  const [userData, setUserData] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [addUserModal, setAddUserModal] = useState(false);
  const [editUserModal, setEditUserModal] = useState(false);
  const debounceValue = useDebounce(search, 500);

  const [editName, setEditName] = useState<EditNameState>({
    username: "",
    id: "",
    // value: "",
    user_id: "",
  });

  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchingUser = await axios.get(
          `/admin/fetch-user${
            debounceValue ? `?search=${debounceValue}` : " "
          } `
        );
        console.log(fetchingUser.data.data, "fetchedUsers");
        const { data } = fetchingUser;

        setUserData(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [debounceValue]);

  const handleAddUser = async (
    values: AddUserValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      console.log(values, "values");
      const response = await axios.post("/admin/add-user", values);

      if (response.data.success) {
        const editUserData = await axios.get("/admin/fetch-user");

        setUserData(editUserData.data.data);

        toast.success(response.data.success);

        resetForm();

        setAddUserModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openEditModal = (id: string) => {
    const user = userData.find((user) => user._id === id);

    if (user) {
      setEditName({
        username: user?.name,
        id: user?._id,
        user_id: user?._id,
      });
    }
    setEditUserModal(true);
  };

  const handleEditUserName = async (
    values: { username: string },
    { resetForm }: { resetForm: () => void }
  ) => {
    const { username } = values;

    const response = await axios.post("/admin/edit-user", {
      name: username,
      _id: editName.user_id,
    });

    if (response.data.success) {
      toast.success(response.data.success);
      const updatedData = await axios.get("/admin/fetch-user");
      setUserData(updatedData.data.data);
      setEditUserModal(false);
      resetForm();
    }
  };

  const handleDeleteUser = async (id : string) => {

    const user = userData.find((user) => user._id === id);

    const isDeleting = window.confirm('Are you sure you want to delete this user');

    if(!isDeleting) return;

    const response = await axios.delete('/admin/delete-user',{data : { userId : user?._id}});

    if(response.data.success){
      toast.success(response.data.success);

      const editUser = await axios.get('/admin/fetch-user');

      setUserData(editUser.data.data);

    }
    
  }

  return (
    <>
      <div className="min-h-screen bg-emerald-900 flex flex-col">
        <AdminNavbar />

        <div className="container mx-auto px-4 py-8 flex-grow">
          <div className="bg-emerald-800 rounded-xl shadow-2xl overflow-hidden">
            <div className="p-4 bg-emerald-700 flex justify-between items-center">
              <div className="relative flex-grow mr-4">
                <input
                  type="text"
                  placeholder="Search users..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-emerald-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white"
                />
                <Search
                  className="absolute left-3 top-3 text-emerald-400"
                  size={20}
                />
              </div>
              <button
                onClick={() => setAddUserModal(true)}
                className="bg-emerald-600 hover:bg-emerald-700 transition-colors duration-300 rounded-lg px-4 py-2 flex items-center"
              >
                <Plus className="mr-2" /> Add User
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-emerald-700">
                  <tr>
                    {["#", "Name", "Email", "Role", "Status", "Actions"].map(
                      (header) => (
                        <th
                          key={header}
                          className="px-6 py-3 text-left text-xs font-semibold text-emerald-300 uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {userData.map((user, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-emerald-800" : "bg-emerald-750"
                      } hover:bg-emerald-700 transition-colors`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-emerald-400">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-emerald-400">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-emerald-400">
                        <span
                          className={`
                        px-3 py-1 rounded-full text-xs font-semibold bg-green-900 text-green-300
                      `}
                        >
                          {user.role.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`
                        px-3 py-1 rounded-full text-xs font-semibold
                        ${
                          user.status === "Active"
                            ? "bg-emerald-900 text-emerald-300"
                            : "bg-red-900 text-red-300"
                        }
                      `}
                        >
                          {user.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => openEditModal(user?._id)}
                          className="text-emerald-400 hover:text-emerald-600 mr-4 transition-colors"
                        >
                          <Pencil size={18} />
                        </button>
                        <button onClick={() => handleDeleteUser(user?._id)} className="text-red-400 hover:text-red-600 transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {addUserModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-emerald-900 p-8 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6 text-center text-white">
              Add User
            </h2>
            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
                cpassword: "",
              }}
              validationSchema={AddUserValidationSchema}
              onSubmit={handleAddUser}
            >
              {/* {({ isSubmitting }) => ( */}
              <Form className="space-y-6">
                {["name", "email", "password", "cpassword"].map((field) => (
                  <div key={field}>
                    <label
                      htmlFor={field}
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      {field === "cpassword"
                        ? "Confirm Password"
                        : field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <Field
                      type={field.includes("password") ? "password" : "text"}
                      id={field}
                      name={field}
                      className="mt-1 block w-full border border-emerald-700 rounded-md shadow-sm py-2 px-3 bg-emerald-800 text-white focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                    />
                    <ErrorMessage
                      name={field}
                      component="p"
                      className="mt-2 text-sm text-red-400"
                    />
                  </div>
                ))}
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    className="px-4 py-2 border border-emerald-600 rounded-md shadow-sm text-sm font-medium text-emerald-300 hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                    onClick={() => setAddUserModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    // disabled={isSubmitting}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
                  >
                    {/* {isSubmitting ? 'Adding...' : 'Add User'} */}
                    Add User
                  </button>
                </div>
              </Form>
              {/* )} */}
            </Formik>
          </div>
        </div>
      )}
      {editUserModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity">
          <div className="bg-emerald-900 p-8 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6 text-center text-white">
              Edit User Name
            </h2>
            <Formik
              initialValues={{ username: editName.username }}
              validationSchema={editUserNameValidationSchema}
              onSubmit={handleEditUserName}
            >
              <Form className="space-y-6">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-emerald-300 mb-2"
                  >
                    New Name
                  </label>
                  <Field
                    name="username"
                    id="username"
                    type="text"
                    className="mt-1 block w-full border border-emerald-700 rounded-md shadow-sm py-2 px-3 bg-emerald-800 text-white focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="username"
                    component="p"
                    className="mt-2 text-sm text-red-400"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    className="px-4 py-2 border border-emerald-600 rounded-md shadow-sm text-sm font-medium text-emerald-300 hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                    onClick={() => setEditUserModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                  >
                    Save
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;
