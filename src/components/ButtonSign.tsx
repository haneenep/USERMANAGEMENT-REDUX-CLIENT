interface ButtonTypes {
  text: string;
}

const Button : React.FC<ButtonTypes> = ({ text }) => {
  return (
    <>
    <button
      type="submit"
      className={`w-full py-4 px-6 rounded-lg bg-emerald-600 text-white font-medium
      hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 
      focus:ring-offset-2 focus:ring-offset-emerald-800 transform hover:-translate-y-0.5 
      transition-all duration-200 shadow-lg hover:shadow-emerald-500/50`}
      >
      {text}
    </button>
        </>
  );
};

export default Button;
