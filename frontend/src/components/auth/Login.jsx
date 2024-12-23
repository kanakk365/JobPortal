import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { ScInput } from "../ui/scInput";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setLoading } from "@/store/Slice/authSlice";
import store from "@/store/store";
import { Loader2 } from "lucide-react";

function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);
  console.log(user);

  function changeEventHandler(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const formData = new FormData();

      formData.append("email", input.email);
      formData.append("password", input.password);
      formData.append("role", input.role);

      const res = await axios.post(`${USER_API_ENDPOINT}/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setAuthUser(res.data.user));
        toast.success(res.data.message);
        navigate("/");
        console.log(res.data.user);
      }
    } catch (e) {
      console.log(`Error while login in :: ${e}`);
      toast.error(e.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });
  return (
    <div>
      <Navbar />
      <div className="flex mx-auto items-center justify-center max-w-7xl px-4 sm:px-8 sm:mt-2 mt-16">
        <form
          onSubmit={submitHandler}
          className="w-full md:w-1/2 lg:w-1/2 flex flex-col gap-2 border border-gray-200 rounded-md px-4 sm:px-8 py-4 my-12 sm:my-24"
        >
          <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-5">Login</h1>

          <div>
            <Label>Email</Label>
            <Input
              onChange={changeEventHandler}
              value={input.email}
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full"
            />
          </div>
          <div>
            <Label>Password</Label>
            <Input
              onChange={changeEventHandler}
              value={input.password}
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <RadioGroup className="flex items-center gap-2 sm:gap-4 my-3 sm:my-5">
                <div className="flex items-center space-x-2">
                  <ScInput
                    onChange={changeEventHandler}
                    type="radio"
                    name="role"
                    value="student"
                    className="!bg-transparent cursor-pointer shadow-none h-10 focus-visible:ring-0"
                  />
                  <Label htmlFor="r1">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <ScInput
                    onChange={changeEventHandler}
                    type="radio"
                    name="role"
                    value="recruiter"
                    className="!bg-transparent cursor-pointer shadow-none focus-visible:ring-0"
                  />
                  <Label htmlFor="r2">Recruiter</Label>
                </div>
              </RadioGroup>
            </div>
            {loading ? (
              <Button className="w-full my-4">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              </Button>
            ) : (
              <Button type="submit" className="w-full my-4">
                Login
              </Button>
            )}
          </div>
          <span className="text-center text-sm">
            Don't have an account?{" "}
            <Link to={"/signup"}>
              <Button
                className="px-1 font-semibold text-blue-600"
                variant="link"
              >
                Signup
              </Button>
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login;
