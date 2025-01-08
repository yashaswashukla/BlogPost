import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "../lib/utils";
import { IconBrandGoogle } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { BackgroundLines } from "./ui/background-line";
import { signinInput } from "@yashaswashukla/blog-post";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { PulseLoader } from "react-spinners";
import { useToast } from "../hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";

export function SigninForm() {
  const { toast } = useToast();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [type, setType] = useState("password");
  const [postInputs, setPostInputs] = useState<signinInput>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signin`,
        postInputs
      );
      if (response.status === 200) {
        const jwt = response.data.token;
        localStorage.setItem("token", jwt);
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("email", response.data.email);
        setLoading(false);
        navigate("/blogs");
      } else {
        throw new Error();
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong",
        description: "Please enter valid inputs",
      });
      console.log("Hi");
      setLoading(false);
      setError(true);
    }
  };

  return (
    <BackgroundLines className="flex flex-col justify-center">
      <div
        className={`z-20 max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 pb-2 md:p-8 md:pb-4 ${
          error ? "border border-red-500" : "border border-slate-100"
        }  bg-white dark:bg-black shadow-lg hover:shadow-xl`}
      >
        <h2 className="font-bold text-2xl text-neutral-800 dark:text-neutral-200">
          Welcome back to BlogPost
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300 flex gap-x-1">
          Dont have an account?{" "}
          <div className="font-bold text-zinc-800 transition-transform hover:scale-105 hover:translate-x-1">
            <Link to="/signup">Sign Up</Link>
          </div>
        </p>

        <form className={`${error ? "my-4" : "my-8"}`} onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="projectmayhem@fc.com"
              type="email"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  email: e.target.value,
                });
              }}
              className={`${error ? "border border-red-500" : ""}`}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <div className="grid grid-cols-12 items-center gap-x-2">
              <div className="col-span-11">
                <Input
                  id="password"
                  placeholder="••••••••"
                  type={type}
                  onChange={(e) =>
                    setPostInputs({ ...postInputs, password: e.target.value })
                  }
                />
              </div>
              <button
                className="col-span-1"
                type="button"
                onClick={() => {
                  setShow(!show);
                  if (type === "password") setType("text");
                  else setType("password");
                }}
              >
                {show ? <Eye /> : <EyeOff />}
              </button>
            </div>
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            {loading == true ? (
              <PulseLoader color="#ffffff" size={8} />
            ) : (
              "Sign up"
            )}
            <BottomGradient />
          </button>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

          <div className="flex flex-col">
            <button
              className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
              type="submit"
            >
              <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                Google
              </span>
              <BottomGradient />
            </button>
          </div>
        </form>
      </div>
    </BackgroundLines>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
