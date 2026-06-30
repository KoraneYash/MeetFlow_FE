"use client";
import axiosInstance from "@/lib/axios";
import { setUser } from "@/redux/slices/userSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("yash@test.com");
  const [password, setPassword] = useState("123456");
  const [isLogging, setIsLogging] = useState(false);

  async function handleLogin() {
    try {
      setIsLogging(true);
      if (!email || email.trim().length == 0) {
        return toast.error("Please enter email");
      }
      if (!password) {
        return toast.error("Please enter password");
      }
      const payload = {
        email: email,
        password: password,
      };
      let result = await axiosInstance.post("/auth/login", payload);
      console.log("result:", result);
      if (result.status == 200) {
        localStorage.setItem("token", result.data.data.token);
        dispatch(setUser({ user: result.data?.data?.user, token: result.data?.data?.token }));
        router.push("/dashboard");
      }
    } catch (error) {
      console.log("error:", error);
    } finally {
      setIsLogging(false);
    }
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <p className=" font-bold text-3xl">Sign In</p>
      <div className="flex flex-col justify-start gap-4">
        <div className="flex flex-col">
          <p> Email :</p>
          <input
            type="text"
            className="border-2 w-100 rounded-sm p-2"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col">
          <p> Password:</p>
          <input
            type="text"
            className="border-2 w-100 rounded-sm p-2"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center">
          <button
            className="w-20 h-fit p-2 m-2 bg-green-300 border-2 rounded-sm"
            onClick={() => {
              handleLogin();
            }}
            disabled={isLogging}
          >
            Login
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center m-10">
        <p>Don't have account, register here!</p>
        <p className="text-blue-400 underline">
          {" "}
          <Link href="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
