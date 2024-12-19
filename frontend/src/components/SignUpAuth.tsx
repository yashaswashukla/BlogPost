import { useState } from "react";
import InputBox from "./InputBox";
import PasswordBox from "./PasswordBox";
import { signupInput } from "@yashaswashukla/blog-post";
import AuthHeader from "./AuthHeader";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";

function SignUpAuth() {
  const [postInputs, setPostInputs] = useState<signupInput>({
    email: "",
    name: "",
    password: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const sendRequest = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signup`,
        postInputs
      );
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("name", response.data.name);
      localStorage.setItem("email", response.data.email);
      setLoading(false);
      navigate("/blogs");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="flex justify-center">
        <div className="grid grid-cols-1">
          <AuthHeader type="signup" />

          <InputBox
            label="Email"
            placeholder="johnDoe@xyz.com"
            onChange={(e) => {
              setPostInputs({ ...postInputs, email: e.target.value });
            }}
          />

          <InputBox
            label="Name"
            placeholder="John Doe"
            onChange={(e) => {
              setPostInputs({ ...postInputs, name: e.target.value });
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
            className="transition ease-in-out delay-300 hover:scale-110 focus:scale-90 w-full bg-black rounded-md text-center text-white py-1.5 mt-6 hover:bg-gray-900"
          >
            {loading == true ? (
              <PulseLoader color="#ffffff" size={8} />
            ) : (
              "Sign In"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUpAuth;
