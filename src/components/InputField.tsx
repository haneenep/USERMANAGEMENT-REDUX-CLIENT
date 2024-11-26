import { ErrorMessage, Field } from "formik";

interface InputTypes {
    name : string;
    type : string;
    label : string;
}

const Input = ({name,type,label}:InputTypes) => {
    return (
       
            <div className="mb-6">
              <label
                htmlFor={name}
                className="block font-medium text-sm text-emerald-100 mb-2"
              >
                {label}
              </label>
              <Field
                type={type}
                name={name}
                id={name}
                className="w-full px-4 py-3 bg-emerald-800/50 border border-emerald-600 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                           text-emerald-100 placeholder-emerald-400/60 transition-colors duration-200"
                placeholder={`Enter your ${label.toLowerCase()}`}
              />
              <ErrorMessage
                name={name}
                component="div"
                className="mt-2 text-red-400 text-sm"
              />
            </div>
          );
}

export default Input;