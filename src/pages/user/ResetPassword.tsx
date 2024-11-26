import { ResetPasswordValidation } from "../../formvalidation/ResetValidation";
import { ErrorMessage, Field, Formik, Form } from "formik";
import Navbar from "../../components/Navbar";
import axios from "../../axios/axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


interface Root {
  user : {
    userData : {
      email : string
    }
  }
}

const ResetPassword = () => {
  interface dataType {
    currentpassword: string;
    password: string;
    cpassword: string;
  }

  const userData = useSelector((state: Root) => state.user.userData);

  const handleSubmit = async (
    data: dataType,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      console.log(data, userData.email, "its from the password");
      const response = await axios.post("/reset-password", {
        ...data,
        email: userData.email,
      });
      // console.log(response.data,"here is ti");
      if (response.data.success) {
        toast.success("password successfully changed");
        resetForm();
      } else {
        toast.error("password is not match");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const initialValues: dataType = {
    currentpassword: "",
    password: "",
    cpassword: "",
  };

  return (
    <div>
      <Navbar />
      <div className="bg-emerald-900 min-h-screen w-full">
        <main className="w-full py-8 flex justify-center">
          <div className="max-w-2xl w-full p-6">
            <div className="w-full px-8 py-10 bg-emerald-800/50 rounded-xl backdrop-blur-sm shadow-xl">
              <h2 className="text-3xl font-bold text-emerald-50 mb-8">
                Reset Password
              </h2>
              <div className="w-full">
                <Formik
                  initialValues={initialValues}
                  validationSchema={ResetPasswordValidation}
                  onSubmit={handleSubmit}
                >
                  <Form className="space-y-6">
                    <div className="space-y-4">
                      <div className="w-full">
                        <label
                          htmlFor="currentpassword"
                          className="block mb-2 text-sm font-medium text-emerald-100"
                        >
                          Current Password
                        </label>
                        <Field
                          type="password"
                          id="currentpassword"
                          name="currentpassword"
                          className="w-full p-3 bg-emerald-700/50 border border-emerald-600 text-emerald-100 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 placeholder-emerald-300/50"
                          placeholder="Enter current password"
                          required
                        />
                        <ErrorMessage
                          name="currentpassword"
                          component="p"
                          className="mt-1 text-sm text-red-400"
                        />
                      </div>

                      <div className="w-full">
                        <label
                          htmlFor="password"
                          className="block mb-2 text-sm font-medium text-emerald-100"
                        >
                          New Password
                        </label>
                        <Field
                          type="password"
                          name="password"
                          id="password"
                          className="w-full p-3 bg-emerald-700/50 border border-emerald-600 text-emerald-100 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 placeholder-emerald-300/50"
                          placeholder="Enter new password"
                        />
                        <ErrorMessage
                          name="password"
                          component="p"
                          className="mt-1 text-sm text-red-400"
                        />
                      </div>

                      <div className="w-full">
                        <label
                          htmlFor="cpassword"
                          className="block mb-2 text-sm font-medium text-emerald-100"
                        >
                          Confirm Password
                        </label>
                        <Field
                          type="password"
                          id="cpassword"
                          name="cpassword"
                          className="w-full p-3 bg-emerald-700/50 border border-emerald-600 text-emerald-100 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 placeholder-emerald-300/50"
                          placeholder="Confirm new password"
                        />
                        <ErrorMessage
                          name="cpassword"
                          component="p"
                          className="mt-1 text-sm text-red-400"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <button
                        type="submit"
                        className="px-6 py-3 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-500 focus:ring-4 focus:ring-emerald-500/50 transition-colors duration-200"
                      >
                        Update Password
                      </button>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ResetPassword;
