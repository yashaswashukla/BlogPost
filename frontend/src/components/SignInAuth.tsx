import { useState } from "react";
import InputBox from "./InputBox";
import PasswordBox from "./PasswordBox";
import { signinInput } from "@yashaswashukla/blog-post";
import AuthHeader from "./AuthHeader";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";

function SignInAuth() {
  const [postInputs, setPostInputs] = useState<signinInput>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const sendRequest = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signin`,
        postInputs
      );
      if (response.status != 200) {
        throw new Error();
      }
      const token = response.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("name", response.data.name);
      localStorage.setItem("email", response.data.email);
      setLoading(false);
      navigate("/blogs");
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="flex justify-center">
        <div className="grid grid-cols-1">
          <AuthHeader type="signin" />
          {error && (
            <div className="flex justify-center mt-3">
              <div className="text-red-500 text-lg font-bold">
                Incorrect Email or Password
              </div>
            </div>
          )}

          <InputBox
            label="Email"
            placeholder="johnDoe@xyz.com"
            onChange={(e) => {
              setPostInputs({ ...postInputs, email: e.target.value });
            }}
          />

          <PasswordBox
            label="Password"
            placeholder="••••••••"
            onChange={(e) => {
              setPostInputs({ ...postInputs, password: e.target.value });
            }}
          />
          <button
            onClick={sendRequest}
            className="w-full bg-black rounded-md text-center text-white py-1.5 mt-6 hover:bg-slate-900 transition ease-in-out delay-300 hover:scale-110 focus:scale-90"
          >
            {loading == true ? (
              <PulseLoader color="#ffffff" size={8} />
            ) : (
              "Login"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignInAuth;
