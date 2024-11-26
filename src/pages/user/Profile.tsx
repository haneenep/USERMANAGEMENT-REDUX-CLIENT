import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { ProfileValidation } from "../../formvalidation/ProfileValidation";
import axios from "../../axios/axios";
import { toast } from "react-toastify";
import { setUserData } from "../../redux/features/userSlice";
import defaultImage from "../../assets/user.jpg";
import { ImageUpload } from "../../utils/cloudinary";

interface ProfileData {
  name: string;
  email: string;
  bio: string;
  profileImage?: string;
}

interface RootState {
  user: {
    userData: {
      name: string;
      email: string;
      bio: string;
      profile?: string;
    };
  };
}

const Profile = () => {
  const dispatch = useDispatch();

  const userData = useSelector((state: RootState) => state.user.userData);

  console.log(userData, "userdataaaaaaaa");

  const [image, setImage] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (data: ProfileData) => {
    try {
      const formData = {
        ...data,
        image,
      };

      const response = await axios.post("/edit-profile", formData);

      if (response.data.success) {
        const fetchUserData = await axios.get("/fetchuser");

        toast.success("successfully edited profile");

        dispatch(setUserData(fetchUserData.data));
      } else if (response.data.error) {
        toast.error(response.data.error);
      }
    } catch (error) {
      toast.error("An Error while updating the profile");
      console.log(error);
    }
  };

  // const handleButtonClick = () => {
  //   inputRef.current?.click()
  // }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files?.length) {
        console.log(e, "beforefiles");

        const file = e.target.files[0];

        console.log(file, "files");

        const imageUrl = await ImageUpload(file);

        console.log(imageUrl, "gt from the cloudiary");

        if (!e.target.files?.length) {
          toast.error("No file selected");
          return;
        }

        if (typeof imageUrl === "string" || imageUrl === null) {
          setImage(imageUrl);
        } else {
          console.error("Recieved an unkwown file");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (data: string) => {
    console.log("coing here");

    try {
      const response = await axios.delete(`/delete-image`, {
        params: { data },
      });

      if (response.data.success) {
        const fetchUserData = await axios.get("/fetchuser");

        toast.success(response.data.success);

        dispatch(setUserData(fetchUserData.data));
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const initialValue: ProfileData = {
    name: userData?.name,
    email: userData?.email,
    bio: userData?.bio,
  };

  useEffect(() => {
    setImage(userData.profile || defaultImage);
  }, [userData.profile]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-emerald-900">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-emerald-800 border border-emerald-700 rounded-lg shadow-lg">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-emerald-50">Profile</h2>
            </div>

            <div className="p-6">
              <div className="space-y-8">
                {/* Profile Image Section */}
                <div className="flex flex-col items-center sm:flex-row sm:space-x-8 space-y-4 sm:space-y-0">
                  <div className="relative">
                    <img
                      src={image || defaultImage}
                      alt={`${userData.name}'s profile`}
                      className="w-32 h-32 rounded-full ring-4 ring-emerald-500 bg-emerald-700"
                    />
                    <div className="absolute -bottom-2 -right-2">
                      <label htmlFor="profile-upload">
                        <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-emerald-500 transition-colors">
                          <svg
                            className="w-4 h-4 text-emerald-50"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                        </div>
                      </label>
                      <input
                        ref={inputRef}
                        id="profile-upload"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </div>
                  </div>
                  <div>
                    {userData.profile && (
                      <button
                        onClick={() => handleDelete(userData.email)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-emerald-50 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-emerald-800"
                      >
                        Delete Image
                      </button>
                    )}
                  </div>
                </div>

                {/* Profile Form */}
                <Formik
                  initialValues={initialValue}
                  onSubmit={handleSubmit}
                  validationSchema={ProfileValidation}
                >
                  <Form className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-emerald-100 mb-1">
                          Username
                        </label>
                        <Field
                          type="text"
                          name="name"
                          defaultValue={userData.name}
                          className="w-full px-3 py-2 rounded-md bg-emerald-700 border border-emerald-600 text-emerald-50 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-colors"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="mt-2 text-red-400 text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-emerald-100 mb-1">
                          Email
                        </label>
                        <Field
                          type="email"
                          name="email"
                          defaultValue={userData.email}
                          readOnly
                          className="w-full px-3 py-2 rounded-md bg-emerald-700/50 border border-emerald-600 text-emerald-400 cursor-not-allowed"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="mt-2 text-red-400 text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-emerald-100 mb-1">
                          Bio
                        </label>
                        <Field
                          name="bio"
                          defaultValue={userData.bio ? userData?.bio : "bio"}
                          rows={4}
                          className="w-full px-3 py-2 rounded-md bg-emerald-700 border border-emerald-600 text-emerald-50 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-colors"
                        />
                      </div>
                      <ErrorMessage
                        name="bio"
                        component="div"
                        className="mt-2 text-red-400 text-sm"
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-emerald-50 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-emerald-800"
                      >
                        Save Changes
                      </button>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
