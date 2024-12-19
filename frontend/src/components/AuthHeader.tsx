import { Link } from "react-router-dom";

function AuthHeader({ type }: { type: "signin" | "signup" }) {
  return (
    <div>
      <div className="text-4xl font-bold text-center px-20">
        {type == "signin" ? "Login" : "Create an account"}
      </div>
      <div className="text-lg text-slate-500 text-center mt-2 px-20">
        {type === "signin"
          ? "Don't have an account? "
          : "Already have an account? "}
        <Link
          to={type == "signin" ? "/signup" : "/signin"}
          className="font-semibold underline hover:cursor-pointer"
        >
          {type === "signin" ? "Sign Up" : "Login"}
        </Link>
      </div>
    </div>
  );
}

export default AuthHeader;
